import 'module-alias/register';
import * as path from 'path';

import { initializeApp } from './init';
import { initMenu } from './menu';

const rootFile = path.join(__dirname, '../../index.html');

initializeApp(rootFile);
initMenu();
