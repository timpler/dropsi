import * as path from 'path';
const moduleAlias = require('module-alias');

const root = path.resolve(__dirname, '..');

moduleAlias.addAliases({
  '~app': root,
  '~assets': path.resolve(__dirname, '../../assets'),
});

import { initializeApp } from './init';
import { initMenu } from './menu';

const rootFile = path.join(__dirname, '../../index.html');

initializeApp(rootFile);
initMenu();
