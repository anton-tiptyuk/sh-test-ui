import * as React from 'react';
import { connect } from 'react-redux';

import { CardDeck, Card, Button } from 'react-bootstrap';

import { IVideoState, actions, IActions } from '../../store/videos';
import { StoreState } from '../../store/StoreState';
import { gqlApi } from '../../common/gql';

interface Props extends IActions {
  videos: IVideoState;
}

class Videos extends React.Component<Props> {
  componentDidMount() {
    this.loadVideos();
  }

  loadVideos = () => {
    gqlApi
      .getVideos()
      .then(response => this.props.videosList(response));
  }

  public render() {
    const { videos } = this.props;

    return <div>
      <h1>List of videos</h1>
      <Button onClick={this.loadVideos}>ReLoad</Button>
      <CardDeck>
        {videos.map(({ id, title, filename }) =>
          <Card key={id}>
            <Card.Body>
              <Card.Title>title</Card.Title>
              <Card.Text>{title}</Card.Text>
              <Card.Title>filename</Card.Title>
              <Card.Text>{filename}</Card.Text>
            </Card.Body>
          </Card>
        )}
      </CardDeck>

    </div>;
  }
}

const mapStateToProps = (state: StoreState, props: Props) => ({
  ...props,
  videos: state.videos,
});

export default connect(mapStateToProps, actions)(Videos);
