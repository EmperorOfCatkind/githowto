import { setDefaultTimeout, setWorldConstructor } from '@cucumber/cucumber';
import { CustomWorld } from './world/custom.world.js';

setDefaultTimeout(999999999);
setWorldConstructor(CustomWorld);
