import React from 'react';
import Popup from 'reactjs-popup';

export default () => (
    <Popup trigger={<button>Trigger</button>} position="right center">
      {close => (
        <div>
          Content here
          <a className="close" onClick={close}>
            &times;
          </a>
        </div>
      )}
    </Popup>
  );