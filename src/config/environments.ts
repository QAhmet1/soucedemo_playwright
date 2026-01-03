import 'dotenv/config'

/**
 * Interface defining the structure for each environment's data.
 */
interface EnvData {
    baseUrl: string;
    apiUrl: string;
    adminUser: string;
    adminPass: string;
}

/**
 * Centralized storage for all environments.
 * No need for multiple .env files if the data is not strictly secret.
 */
export const Environments: Record<string, EnvData> = {
    qa: {
        baseUrl: 'https://qa.saucedemo.com',
        apiUrl: 'https://api-qa.saucedemo.com',
        adminUser: process.env.QA_USER|| '',
        adminPass: process.env.QA_PASS || ''
    },
    staging: {
        baseUrl: 'https://staging.saucedemo.com',
        apiUrl: 'https://api-staging.saucedemo.com',
        adminUser: process.env.STG_PASS || '',
        adminPass: process.env.STG_PASS || ''
    },
    prod: {
        baseUrl: 'https://www.saucedemo.com',
        apiUrl: 'https://api.saucedemo.com',
        adminUser: process.env.PROD_USER || '', // Should be handled via Secret Manager in CI/CD
        adminPass: process.env.PROD_PASS || '' 
    }
};