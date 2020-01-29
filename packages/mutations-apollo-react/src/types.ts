import { MutationStates } from '@graphprotocol/mutations/dist/mutationState'

import {
  BaseMutationOptions,
  ExecutionResult,
  MutationResult,
  MutationFunction,
  MutationFunctionOptions
} from '@apollo/react-common'
import { DocumentNode } from 'graphql'
import { MutationHookOptions } from '@apollo/react-hooks';

interface MutationResultWithState<TState, TData = any> extends MutationResult<TData> {
  state: MutationStates<TState>
}

export type MutationTupleWithState<TState, TData, TVariables> = [
  (
    options?: MutationFunctionOptions<TData, TVariables>
  ) => Promise<ExecutionResult<TData>>,
  MutationResultWithState<TState, TData>
];

export interface MutationComponentOptionsWithState<
  TState,
  TData,
  TVariables
> extends BaseMutationOptions<TData, TVariables> {
  mutation: DocumentNode;
  options: MutationHookOptions
  children: (
    mutateFunction: MutationFunction<TData, TVariables>,
    result: MutationResultWithState<TState, TData>
  ) => JSX.Element | null;
}
