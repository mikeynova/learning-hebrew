import React, { PureComponent } from 'react'
import { registerRootComponent } from 'expo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { ApolloProvider } from 'react-apollo'
import { InMemoryCache } from 'apollo-cache-inmemory'
import NavigationService from './NavigationService'
import config from './lib/config'

import RootNavigator from './RootNavigator'
const httpLink = createHttpLink({
  // uri: config.endpoint,
  uri: 'http://localhost:4000/'
})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})
class App extends PureComponent {
  render() {
    return (
      <ApolloProvider client={client}>
        <RootNavigator 
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef)
          }} 
        />
      </ApolloProvider>
    )
  }
}

export default registerRootComponent(App)
