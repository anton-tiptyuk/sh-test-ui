import { ApolloClient } from 'apollo-client';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import gql from 'graphql-tag';

import { apiBase } from './consts';

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: `${apiBase}/graphql`
});

export const gqlClient: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  link
});

export const gqlApi = {
  getVideos: () => {
    return gqlClient
      .query({
        query: gql`
        {
          videos {
            id
            title
            filename
            filenameOrg
            description
            creationDate
          }
        }
        `
      })
      .then(response => response.data.videos)
  },
}
