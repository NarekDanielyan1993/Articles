import React from 'react';
import ReactDOM from 'react-dom';

import './backdrop.css';

const backdrop = props =>
  ReactDOM.createPortal(
    <div
      className={['backdrop', props.open ? 'open' : ''].join(' ')}
      onClick={props.onClick}
    />,
    document.getElementById('backdrop-root')
  )

export default backdrop;
