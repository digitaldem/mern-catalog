import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import { __DEBUG__ } from './app/constants';


// Supress console output methods when not in a debug build
if (!__DEBUG__) {
  console = {
    assert: () => { },
    error: () => { },
    info: () => { },
    log: () => { },
    trace: () => { },
    warn: () => { }
  };
}

// Render the application root
ReactDOM.render(<App />, document.getElementById('root'));
