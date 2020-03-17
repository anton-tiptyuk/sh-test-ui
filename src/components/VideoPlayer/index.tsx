import React from 'react';
import videojs, { VideoJsPlayer } from 'video.js';

import 'video.js/dist/video-js.css';

export default class VideoPlayer extends React.Component {
  private readonly videoNodeRef: React.RefObject<any> = React.createRef();
  private player?: VideoJsPlayer;

  componentDidMount() {
    this.player = videojs(this.videoNodeRef.current, this.props, () => { console.log('player ready'); });
  }

  componentWillUnmount() {
    if (this.player)
      this.player.dispose();
  }

  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856
  render() {
    return <div>
      <div data-vjs-player>
        <video ref={this.videoNodeRef} className="video-js" />
      </div>
    </div>;
  }
}
