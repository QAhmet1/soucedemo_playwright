import { request, APIRequestContext } from '@playwright/test';
import { Config } from '@config/config';

/**
 * @class BaseApi
 * @description Core API class to handle all HTTP operations using Playwright's Request Context.
 */
export class BaseApi {
    
    /**
     * @private
     * @description Configures the request context with base URL and essential headers.
     */
    private async getRequestContext(): Promise<APIRequestContext> {
        const finalBaseUrl = Config.apiUrl.endsWith('/') ? Config.apiUrl : `${Config.apiUrl}/`;
        
        return await request.newContext({
            baseURL: finalBaseUrl,
            extraHTTPHeaders: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'User-Agent': 'Playwright-Automation'
            }
        });
    }

    // --- HTTP METHODS ---

    async get(endpoint: string) {
        const context = await this.getRequestContext();
        return await context.get(endpoint);
    }

    async post(endpoint: string, data: any) {
        const context = await this.getRequestContext();
        return await context.post(endpoint, { data });
    }

    async put(endpoint: string, data: any) {
        const context = await this.getRequestContext();
        return await context.put(endpoint, { data });
    }

    async patch(endpoint: string, data: any) {
        const context = await this.getRequestContext();
        return await context.patch(endpoint, { data });
    }

    async delete(endpoint: string) {
        const context = await this.getRequestContext();
        return await context.delete(endpoint);
    }
}