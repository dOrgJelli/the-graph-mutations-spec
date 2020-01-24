import {
  EventPayload,
  EventTypeMap,
  MutationEvents,
  MutationState,
  MutationStates,
  InferEventPayload,
  StateBuilder
} from './types'
import {
  CoreEvents,
  CoreState,
  coreStateBuilder,
  TransactionCompletedEvent,
  TransactionCreatedEvent,
  TransactionErrorEvent
} from './core'

import { BehaviorSubject } from 'rxjs'
import cloneDeep from 'lodash/cloneDeep'

class StateUpdater<
  TState = { },
  TEventMap extends EventTypeMap = { }
> {

  private _state: MutationState<TState>
  private _observer?: BehaviorSubject<TState>
  private _ext?: StateBuilder<TState, TEventMap>
  private _core: StateBuilder<CoreState, CoreEvents>

  constructor(
    uuid: string,
    ext?: StateBuilder<TState, TEventMap>,
    observer?: BehaviorSubject<TState>
  ) {
    this._observer = observer
    this._ext = ext
    this._core = coreStateBuilder

    this._state = {
      ...this._core.getInitialState(uuid),
      ...(this._ext ? this._ext.getInitialState(uuid) : { } as TState),
    }
  }

  public get current() {
    return cloneDeep(this._state)
  }

  public async dispatch<TEvent extends keyof MutationEvents<TEventMap>>(
    event: TEvent,
    payload: InferEventPayload<TEvent, MutationEvents<TEventMap>>
  ) {

    // Append the event
    this._state.events.push({
      event: event as string,
      payload
    })

    // Call all relevant reducers
    const coreReducers = this._core.reducers as any
    const coreReducer = this._core.reducer
    const extReducers = this._ext?.reducers as any
    const extReducer = this._ext?.reducer

    if (coreReducers && coreReducers[event] !== undefined) {
      const coreState = await coreReducers[event](cloneDeep(this._state), payload)
      this._state = cloneDeep({...this._state, ...coreState})
    } else if (coreReducer) {
      const coreState = await coreReducer(cloneDeep(this._state), event as string, payload)
      this._state = cloneDeep({...this._state, ...coreState})
    }

    if (extReducers && extReducers[event] !== undefined) {
      this._state = await extReducers[event](cloneDeep(this._state), payload)
    } else if (extReducer) {
      this._state = await extReducer(cloneDeep(this._state), event as string, payload)
    }

    // Publish the latest state
    this.publish()
  }

  private publish() {
    if (this._observer) {
      this._observer.next(cloneDeep(this._state))
    }
  }
}

export {
  EventPayload,
  EventTypeMap,
  MutationEvents,
  StateBuilder,
  MutationState,
  MutationStates,
  StateUpdater,
  CoreState,
  CoreEvents,
  TransactionCompletedEvent,
  TransactionCreatedEvent,
  TransactionErrorEvent
}