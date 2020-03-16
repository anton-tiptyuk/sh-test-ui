import * as React from 'react';
import { connect } from 'react-redux';

import { CardDeck, Card, Button } from 'react-bootstrap';

import { apiBase } from '../../common/consts';
import { IVideoState, actions, IActions } from '../../store/videos';
import { StoreState } from '../../store/StoreState';
import { gqlApi } from '../../common/gql';

import './index.css';

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

  remove = (id: string) => {
    gqlApi
      .deleteVideo(id)
      .then(() => this.props.videosDelete(id));
  }

  public render() {
    const { videos } = this.props;

    return <div>
      <h1>List of videos <Button onClick={this.loadVideos}>ReLoad</Button></h1>

      <CardDeck>
        {videos.map(({ id, title, filename, thumbnailPath }) =>
          <Card key={id}>
            <Card.Img variant='top' src={`${apiBase}${thumbnailPath}`} />
            <Card.Body>
              <Card.Title>title</Card.Title>
              <Card.Text>{title}</Card.Text>
              <Card.Title>filename</Card.Title>
              <Card.Text>{filename}</Card.Text>
              <Button onClick={() => this.remove(id)}>Remove</Button>
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
