import { BeforeAll } from '@cucumber/cucumber';
import { CustomWorld } from '../world/custom.world.js';

export function globalContextHook(): void {
    BeforeAll(async function() {
        CustomWorld.globalContext = new Map();
    });
}
