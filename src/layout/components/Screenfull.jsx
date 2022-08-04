import React, { Component } from 'react';
import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons';
import screenfull from 'screenfull';

export default class Screenfull extends Component {
  state = {
    isFullscreen: false,
  };
  componentDidMount() {
    if (screenfull.enabled) {
      screenfull.on('change', this.change);
    }
  }
  componentWillUnmount() {
    if (screenfull.enabled) {
      screenfull.off('change', this.change);
    }
  }
  change = () => {
    this.setState({
      isFullscreen: screenfull.isFullscreen,
    });
  };
  toggleScreenfull = () => {
    screenfull.toggle();
  };
  render() {
    const style = { fontSize: '20px', marginRight: '10px' };
    const { isFullscreen } = this.state;
    return (
      <>
        {isFullscreen ? (
          <FullscreenExitOutlined onClick={this.toggleScreenfull} style={style} />
        ) : (
          <FullscreenOutlined onClick={this.toggleScreenfull} style={style} />
        )}
      </>
    );
  }
}
