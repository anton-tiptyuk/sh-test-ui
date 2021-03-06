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
            path
            thumbnailPath
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

  addVideo: (
    title: string,
    filename: string,
    uploadPath: string,
    thumbnailPath: string,
    description?: string
  ) => {
    return gqlClient
      .mutate({
        mutation: gql`
          mutation addVideo($title: String!, $filename: String!, $uploadPath: String!, $thumbnailPath: String!, $description: String) {
            addVideo(newVideoData: { title: $title, filename: $filename, uploadPath: $uploadPath, thumbnailPath: $thumbnailPath, description: $description }) {
              id
              title
              filename
              path
              thumbnailPath
              description
              creationDate
            }
          }
        `,
        variables: {
          title,
          filename,
          uploadPath,
          thumbnailPath,
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
