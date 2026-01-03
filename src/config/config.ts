import { Environments } from './environments';

/**
 * Current environment name from CLI (ENV=staging) or default to 'qa'
 */
const currentEnv = process.env.ENV || 'qa';

/**
 * Exporting the selected environment's configuration.
 */
export const Config = Environments[currentEnv];

console.log(`[FRAMEWORK]: Running on environment: ${currentEnv.toUpperCase()}`);