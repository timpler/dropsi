// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
import React from 'react';

import * as path from 'path';
const moduleAlias = require('module-alias');

const root = path.resolve(__dirname, '..');

moduleAlias.addAliases({
  '~app': root,
});

import { render } from 'react-dom';

import { App } from './App';

render(<App />, document.getElementById('app'));
