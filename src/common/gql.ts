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
        `,
        // 2do: extremely lame but time is a factor
        fetchPolicy: 'no-cache',
      })
      .then(response => response.data.videos)
  },

  addVideo: (title: string, filename: string, description?: string) => {
    return gqlClient
      .mutate({
        mutation: gql`
          mutation addVideo($title: String!, $filename: String!, $description: String) {
            addVideo(newVideoData: { title: $title, filename: $filename, description: $description }) {
              id
              title
              filename
              filenameOrg
              description
              creationDate
            }
          }
        `,
        variables: {
          title,
          filename,
          description,
        },
      })
      .then(response => response.data.addVideo);
  },

  deleteVideo: (id: string) => {
    return gqlClient
      .mutate({
        mutation: gql`
        mutation removeVideo($id: String!) {
          removeVideo(id: $id)
        }
        `,
        variables: { id },
      })
      .then(() => id);
  },

};
