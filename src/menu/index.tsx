// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
import React from 'react';
import * as tsPaths from 'tsconfig-paths';
import 'module-alias/register';

tsPaths.register({
  baseUrl: '..',
  paths: {
    '~app/*': ['./*'],
  },
});

import { render } from 'react-dom';

import { Menu } from './Menu';

render(<Menu />, document.getElementById('app'));
