/* eslint-disable no-shadow */
import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

function ScrollContainer({ style, ...props }) {
  return (
    <Scrollbars
      style={{ paddingBottom: 200 }}
      renderTrackHorizontal={(props) => (
        <div
          {...props}
          className="track-horizontal"
          style={{ display: 'none' }}
        />
      )}
      renderThumbHorizontal={(props) => (
        <div
          {...props}
          className="thumb-horizontal"
          style={{ display: 'none' }}
        />
      )}
      renderTrackVertical={(props) => (
        <div
          {...props}
          className="track-vertical"
          style={{ display: 'none' }}
        />
      )}
      renderThumbVertical={(props) => (
        <div
          {...props}
          className="thumb-vertical"
          style={{ display: 'none' }}
        />
      )}
    >
      {props.children}
    </Scrollbars>
  );
}

export default ScrollContainer;
