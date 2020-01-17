import gql from "graphql-tag"
import { ethers } from "ethers"
import IPFSClient from "ipfs-http-client"
import {
  EventPayload,
  StateBuilder,
  FullState,
  ManagedState
} from "@graphprotocol/mutations-ts"
import { Transaction } from "ethers/utils"

interface ProgressUpdateEvent extends EventPayload {
  progress: number
}

type EventMap = {
  'PROGRESS_UPDATED': ProgressUpdateEvent
}

interface CustomState {
  progress: number
  myValue: number
  myFlag: boolean
}

const stateBuilder: StateBuilder<CustomState, EventMap> = {
  getInitialState(): CustomState {
    return {
      progress: 0,
      myValue: 0,
      myFlag: false
    }
  },
  reducers: {
    "PROGRESS_UPDATED": async (state: FullState<CustomState>, payload: ProgressUpdateEvent) => {
      state.progress = payload.progress;
      return state
    }
  }
}

async function queryUserGravatar(context: any) {
  const { client } = context
  const { ethereum } = context.graph.config

  return await client.query({
    query: gql`
      query GetGravatars {
        gravatars (where: {owner: "${ethereum.provider.selectedAddress}"}) {
          id
          owner
          displayName
          imageUrl
        }
      }`
  }
  )
}

async function sendTx(tx: Transaction, state: ManagedState<CustomState, EventMap>) {
  try {
    tx = await tx
    await state.sendEvent("TRANSACTION_SENT", {id: tx.hash, description: tx.data})
    return tx;
  } catch (error) {
    await state.sendEvent('TRANSACTION_ERROR', error)
  }
}

async function getGravityContract(context: any) {
  const { ethereum } = context.graph.config
  const abi = await context.graph.dataSources.Gravity.abi
  const address = await context.graph.dataSources.Gravity.address

  const contract = new ethers.Contract(
    address, abi, ethereum.getSigner()
  )
  contract.connect(ethereum)
  return contract
}

async function createGravatar(_root: any, { options }: any, context: any) {
  const { displayName, imageUrl } = options
  const gravity = await getGravityContract(context)
  const state: ManagedState<CustomState, EventMap> = context.state;
  await sendTx(gravity.createGravatar(displayName, imageUrl), state)
  const { data } = await queryUserGravatar(context)
  return data.gravatars[0]
}

async function updateGravatarName(_root: any, { displayName }: any, context: any) {
  const gravity = await getGravityContract(context)
  const state: ManagedState<CustomState, EventMap> = context.graph.state;
  await state.sendEvent("PROGRESS_UPDATED", {progress: 20})
  await sleep(2000)
  if(context.fail) throw new Error("Transaction Errored (Controlled Error Test Case)")
  const txResult = await sendTx(gravity.updateGravatarName(displayName), state)
  if(!txResult) throw new Error("ON ERROR ERROR")
  await state.sendEvent("PROGRESS_UPDATED", {progress: 100})
  const { data } = await queryUserGravatar(context)
  return data.gravatars[0];
}

async function updateGravatarImage(_root: any, { imageUrl }: any, context: any) {
  const gravity = await getGravityContract(context)
  const state: ManagedState<CustomState, EventMap> = context.state;
  await sendTx(gravity.updateGravatarImage(imageUrl), state)
  const { data } = await queryUserGravatar(context)
  return data.gravatars[0]
}

const resolvers = {
  Mutation: {
    createGravatar,
    updateGravatarName,
    updateGravatarImage
  }
}

const config = {
  ethereum: (provider: any) => {
    return new ethers.providers.Web3Provider(provider)
  },
  ipfs: (provider: string) => {
    const url = new URL(provider)
    return IPFSClient({
      protocol: url.protocol.replace(/[:]+$/, ''),
      host: url.hostname,
      port: url.port,
      'api-path': url.pathname.replace(/\/$/, '') + '/api/v0/',
    })
  },
  // Example of a custom configuration property
  property: {
    // Property setters can be nested
    a: (value: string) => { },
    b: (value: string) => { }
  }
}

export type State = FullState<CustomState>

export default {
  resolvers,
  config,
  stateBuilder
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
