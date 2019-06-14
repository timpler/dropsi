// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
import React from 'react';
const moduleAlias = require('module-alias');
import * as path from 'path';

const root = path.resolve(__dirname, '..');

moduleAlias.addAliases({
  '~app': root,
});

import { render } from 'react-dom';

import { Menu } from './Menu';

render(<Menu />, document.getElementById('app'));
