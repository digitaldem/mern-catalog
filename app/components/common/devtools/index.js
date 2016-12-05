import React from 'react';
import { createDevTools } from 'redux-devtools';
import DockMonitor from 'redux-devtools-dock-monitor';
import LogMonitor from 'redux-devtools-log-monitor';
import { __DEBUG__ } from '../../../constants';


const DevTools = (__DEBUG__)
  ? createDevTools(
    <DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-w" defaultIsVisible={false}>
      <LogMonitor />
    </DockMonitor>
    )
  : React.createElement('div').type;

export default DevTools;
