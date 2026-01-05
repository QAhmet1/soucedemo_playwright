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
        baseUrl: process.env.QA_URL || '',
        apiUrl: process.env.QA_API_URL || '',
        adminUser: process.env.QA_USER|| '',
        adminPass: process.env.QA_PASS || ''
    },
    prod: {
        baseUrl: process.env.PROD_URL || '',
        apiUrl: process.env.PROD_API_URL ||'',
        adminUser: process.env.PROD_USER || '', // Should be handled via Secret Manager in CI/CD
        adminPass: process.env.PROD_PASS || '' 
    }
};