# **The Graph - Mutation Support**
This document starts with the "Gravatars" example project, and walks through the steps a developer would take to add Mutations to the subgraph and dApp.    

Original source available here:  
[`./subgraph`](./subgraph): https://github.com/graphprotocol/example-subgraph  
[`./dapp`](./dapp): https://github.com/graphprotocol/ethdenver-dapp  

# User Story: Protocol Developer

Starting in the [./subgraph](./subgraph) folder...

## Step 1: Mutation Schema & Manifest Files

[`mutations/schema.graphql`](./subgraph/src/mutations/schema.graphql)
```graphql
input GravatarOptions {
  displayName: String!
  imageUrl: String!
}

type Mutation {
  createGravatar(
    options: GravatarOptions!
  ): Gravatar

  updateGravatarName(
    displayName: String!
  ): Gravatar

  updateGravatarImage(
    imageUrl: String!
  ): Gravatar
}
```

**NOTE:** GraphQL types from the subgraph's [schema.graphql](./subgraph/schema.graphql) are automatically included in this file.

[`mutations.yaml`](./subgraph/mutations/mutations.yaml)
```yaml
specVersion: 0.0.1
repository: https://npmjs.com/package/gravatar-mutations
mutations:
  schema:
    file: ./schema.graphql
  resolvers:
    kind: javascript
    file: ./dist/index.js
```

### Decisions Made
**Define Mutations In GraphQL:**  
Keeping everything in GraphQL...
* Promotes consistency and predictability for how types will be bound to the resolver's implementation language, since this standard is already defined for us by existing GraphQL tooling.
* Allows you to both define new data types (for example `input GravatarOptions`) and use existing entity types (for example `Gravatar`) within your mutation definitions.

**Define Mutations In a Separate GraphQL & YAML File:**  
The following thoughts played a role in this decision...
* In order to promote the decoupling of codebases (subgraph mappings & mutations), defining the mutations in separate GraphQL & YAML files is desired.
* Helps keep write-specific data types separate from the main schema of the subgraph's entity store. To illustrate this, see "GravatarOptions" in the example above. We'd like to keep these types out of the main schema file.
* Ideally developers could publish mutations for pre-existing subgraphs, without having to modify the root manifest.

**Multiple `kind`s of Mutation Resolvers:**  
In the future, we may want to support resolvers that are compiled to WASM.  

**Server-Side == Client-Side Resolvers:**  
Originally, I had "`kind: browser/javascript`", but realized that (1) Apollo GraphQL resolvers have the same signature client-side as they do server-side, and (2) implementing server-side resolvers within graph-node could (and should) be done in a way that doesn't require any code changes from the mutation developer (see "Post MVP Goals" section below).

**Resolvers' `file` Is ES5 Compatible & Bundled:**  
The `resolvers`' `file` property must point to an ES5 compatible javascript module that has been bundled so that there are no external files required by the module at run-time. Transpiling, bundling, and ES5 verification can be done using: [babel](https://www.npmjs.com/package/@babel/cli), [webpack](https://www.npmjs.com/package/webpack), and [es-check](https://www.npmjs.com/package/es-check). The [example project](./subgraph/src/mutations/package.json) demonstrates this build & verification process. The graph-cli will also run this ES5 verification. If developers would like to also supply their users an option to download from a 3rd party repository like npmjs.com or github.com, they can include that link in the `repository` section of the manifest. This is useful if they'd like to give developers an un-minimized version of the source for debugging or auditing.

## Step 2: Add Mutations To Subgraph Manifest

[`subgraph.yaml`](./subgraph/subgraph.yaml)
```yaml
specVersion: 0.0.3
...
schema:
  file: ./schema.graphql
mutations:
  file: ./mutations/mutations.yaml
dataSources:
  - ...
```

## Step 3: Implement The Mutations Resolvers (Javascript)

[`index.js`](./subgraph/src/mutations/src/index.ts)
```js
const resolvers = {
  Mutation: {
    async createGravatar(_root, args, context) {
      // TODO: move this into its own section after user stories called "Extra Functionality"
      //       and document the interface of `context.graph`
      // context.graph.config.ethereum
      // context.graph.config.ipfs
      // context.graph.datasources.${name} -> { address, abi }
      // context.graph.state.addTransaction(txHash)
      ...
    },
    async updateGravatarName(_root, args, context) {
      ...
    },
    async updateGravatarImage(_root, args, context) {
      ...
    }
  }
}

const config = {
  ethereum: (provider: any) => {
    // these are added to the context.graph.config object
    return new Web3(provider)
  },
  ipfs: (provider: string) => {
    return new IPFS(provider)
  },
  // TODO: move this to "Extra Functionality" section
  // Example of a custom configuration property
  property: {
    // Property setters can be nested
    a: (value: string) => { }
  }
}

export default {
  resolvers,
  config
}
```

The requirements for the resolver's [JavaScript module](./subgraph/src/mutations/dist/index.js) are:
1. Default exports an object with properties `resolvers` and `config`.
2. `resolvers` has property `Mutations` which includes all of the schema's mutations.
3. `config`'s "leaf" properties are all functions.
4. Module is ES5 compliant. We can verify this using [es-check](https://www.npmjs.com/package/es-check).
5. Module is bundled with no external dependencies. There is no way to detect this as Javascript is dynamically interpreted, and dependencies can be resolved at run-time. This will just have to be written in bold red text in the docs.

## Step 4: Build & Publish Subgraph

The `graph build` CLI command will now...
1. Parse the [`mutations.file`](./subgraph/subgraph.yaml) section of [the subgraph's manifest](./subgraph/subgraph.yaml), resolve and pase [the mutation's manifest](./subgraph/src/mutations/mutations.yaml).
2. Resolve, parses, and validates the [mutation GraphQL definitions](./subgraph/src/mutations/schema.graphql) from the [`mutations.schema.file`](./subgraph/src/mutations/mutations.yaml) property.
3. Resolve, load, and validate the [resolvers' implementation](./subgraph/src/mutations/dist/index.js) from the [`mutations.resolvers.file`](./subgraph/src/mutations/mutations.yaml) property, ensuring all required exports are present and valid. See require listed above.

The `graph deploy` CLI command will now...
1. Add mutations schema to the graph-node for introspection purposes (see "Post MVP Goals" section).
2. Upload the resolvers' module to IPFS.

# User Story: Application Developer

Moving onto the [./dapp](./dapp) folder...

## Step 1: Download Mutations Module
The resolver's module could be installed via a 3rd party repository, for instance npmjs.com. This site would be listed in the `mutations.yaml` file's `repository` property:  
`npm i --save gravatar-mutations`

Alternatively, the user could download the module via IPFS where it has been uploaded. First they would query a graph-node to get the manifest for the subgraph, and then get the IPFS hash from there. We will provide a graph-cli command that does this for developers:  
`graph mutations fetch gravatar-mutations ./dest`

## Step 2: Add Mutation Resolvers To App
[`App.js`](./dapp/src/App.js)
```javascript
import gravatarMutations from "gravatar-mutations"
import { initMutations } from "@graphprotocol/mutations-ts"

// 1
const mutations = initMutations(
  gravatarMutations,
  // 2 - used to init our context
  {
    graphnode: process.env.GRAPH_NODE,
    ethereum: process.env.WEB3_PROVIDER,
    ipfs: process.env.IPFS_PROVIDER
  }
)

// 3
const client = new ApolloClient({
  uri: process.env.GRAPH_NODE,
  cache: new InMemoryCache(),
  resolvers: mutations.resolvers, // a
})
```

1. Initialize the mutations.
2. Provide values that'll be passed to the `requiredContext` initializers.
3. Create the GraphQL client with the initialized mutation resolvers & context.

### Initialized Mutations?
The `mutations.resolvers` created by this function are a wrapped version of the original `gravatarMutations.resolvers` object. These wrapping functions inject a `context` property named `graph` with all of the fields added by the `requiredContext` generator functions. Additionally the datasource addresses & abis can be fetched from the graph-node and are available like so `await context.graph.datasources.${name}.address`.

## Step 3: Execute Mutations

[`App.js`](./dapp/src/App.js)
```javascript
const CREATE_GRAVATAR = gql`
  mutation createGravatar($options: GravatarOptions) {
    createGravatar(options: $options) {
      id
      owner
      displayName
      imageUrl
    }
  }
`
```
```html
<Mutation
  mutation={CREATE_GRAVATAR}
  variables={{
    options: { displayName: "...", imageUrl: "..." }
  }}
>
  {(execMutation) => (
    <button onClick={execMutation}>
      Create Gravatar
    </button>
  )}
</Mutation>
```

Celebrate!

# Post MVP Goals
## GraphQL Schema Introspection Endpoint
Ensure that the full schema + mutations can be queried from the graph-node's GraphQL endpoint, enabling full schema introspection.

## Optimistic Updates
Optimistic updates can be achieved just like normal (see example [here](https://www.apollographql.com/docs/react/performance/optimistic-ui/)). The big thing that must be kept in mind is that the `id` of the entity the mutation will be returning must be known ahead of time. In order to see optimistic responses + rolling back after errors, run this repo's `web2app` project where we've created a simple TODO app to demonstrate this.

## Graph CLI Updates
`graph mutations codegen` will codegen types from the schema for the mutation resolvers to use (TypeScript, etc).  

`graph init` will add a mutation resolvers package for developers to start implementing from.

## Monitor Status
TODO: more research needed  
In short, we'd like to be able to query the status of a resolver and have granular feedback (custom feedback messages, transactions posted/mined/failed, subgraph ingestion pending, etc).  

## Server Side Execution
Running the mutation resolvers server side, on the graph-node, is beneficial for multiple reasons: implementation updates, no client side web3 connection, non-browser environments, other languages. The client would need to be able to satisfy signature requests from the graph-node when mutations are being executed server side. For running JavaScript mutation resolvers on the server, this could be implemented by wrapping the package in a VM, and having the graph-node act as a proxy between the client and the mutations running in the container:  
1. Client posts mutation query  
2. graph-node forwards request to VM  
3. Resolvers execute in the container  
4. A custom Web3 provider is used in the resolvers, which routes signature requests out of the VM, to the graph-node, to the client, and then back the other way once a signature is given.

## *The Graph* Explorer Support
Utilizing Server Side resolver execution, we can now support mutations within The Graph Explorer.
