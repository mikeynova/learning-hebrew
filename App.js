import React, { PureComponent } from 'react'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { ApolloProvider } from 'react-apollo'
import { InMemoryCache } from 'apollo-cache-inmemory'
import config from './lib/config'

import RootNavigator from './RootNavigator'
const httpLink = createHttpLink({
  uri: config.endpoint
})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})
export default class App extends PureComponent {
  render() {
    return (
      <ApolloProvider client={client}>
        <RootNavigator {...this.props} />
      </ApolloProvider>
    )
  }
}
