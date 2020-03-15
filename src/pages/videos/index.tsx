import * as React from 'react';

import { CardDeck, Card, Button } from 'react-bootstrap';
import gql from 'graphql-tag';

import { gqlClient } from '../../common/gql';

const mockVids = [
  {
    title: 'sample video',
    filename: 'any',
  },
  {
    title: 'another video',
    filename: 'differentFile',
  }
];

export default class Videos extends React.Component {

  doStuff = () => {
    gqlClient
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
      .then(response => {
        console.log(response);
      });
  }

  public render() {
    return <div>
      <h1>List of videos</h1>
      <CardDeck>
        {mockVids.map(({ title, filename }) =>
          <Card>
            <Card.Body>
              <Card.Title>title</Card.Title>
              <Card.Text>{title}</Card.Text>
              <Card.Title>filename</Card.Title>
              <Card.Text>{filename}</Card.Text>
            </Card.Body>
          </Card>
        )}
      </CardDeck>

      <Button onClick={this.doStuff}>Do stuff</Button>
    </div>;
  }

}
