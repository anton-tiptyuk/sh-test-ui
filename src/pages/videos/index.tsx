import * as React from 'react';
import { connect } from 'react-redux';

import { CardDeck, Card, Button, Modal } from 'react-bootstrap';

import { path2url } from '../../common/uploadUrls';
import { gqlApi } from '../../common/gql';
import { IVideo, IVideoState, actions, IActions } from '../../store/videos';
import { StoreState } from '../../store/StoreState';
import VideoPlayer from '../../components/VideoPlayer';

import './index.css';

interface Props extends IActions {
  videos: IVideoState;
}

interface State {
  currentVideo?: IVideo;
}

const defaultState: State = {
  currentVideo: undefined,
};

class Videos extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = defaultState;
  }

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

  closeModal = () => {
    this.setState(defaultState);
  }

  public render() {
    const { currentVideo } = this.state;
    const { videos } = this.props;

    return <div>
      <h1>List of videos <Button onClick={this.loadVideos}>ReLoad</Button></h1>

      <Modal size='lg' centered show={!!currentVideo} onHide={this.closeModal}>
        <Modal.Header closeButton>{currentVideo?.title}</Modal.Header>
        <Modal.Body>
          <VideoPlayer {...{
            autoplay: true,
            controls: true,
            sources: [{
              src: path2url(currentVideo?.path),
              type: 'video/mp4'
            }],
          }} />
        </Modal.Body>
      </Modal>

      <CardDeck>
        {videos.map(video => {
          const { id, title, filename, thumbnailPath } = video;

          const play = () => this.setState({ currentVideo: video });

          return <Card key={id}>
            <Card.Img variant='top' src={path2url(thumbnailPath)} onClick={play} />
            <Card.Body>
              <Card.Title>title</Card.Title>
              <Card.Text>{title}</Card.Text>
              <Card.Title>filename</Card.Title>
              <Card.Text>{filename}</Card.Text>
              <Button onClick={() => this.remove(id)}>Remove</Button>
              &nbsp;
              <Button onClick={play}>Show Player</Button>
            </Card.Body>
          </Card>;
        }
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
