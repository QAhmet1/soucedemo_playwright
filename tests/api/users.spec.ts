import { test, expect } from '@playwright/test';
import { BaseApi } from '@api/BaseApi';

/**
 * @description Integration tests for JSONPlaceholder User Management API.
 * Following SDET Best Practices for API Automation.
 */
test.describe('JSONPlaceholder API: User Management', () => {
    let api: BaseApi;

    // Initialize the API handler before each test suite
    test.beforeAll(async () => {
        api = new BaseApi();
    });

    /**
     * @test Read Operation - GET /users
     * @description Verifies that the API returns a list of users with correct data types.
     */
    test('GET /users - Should fetch all users successfully', async () => {
        const response = await api.get('users');
        
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);

        const users = await response.json();
        expect(Array.isArray(users)).toBeTruthy();
        expect(users.length).toBeGreaterThan(0);
        
        // Validate the structure of the first user object
        const firstUser = users[0];
        expect(firstUser).toHaveProperty('id');
        expect(firstUser).toHaveProperty('name');
        expect(firstUser).toHaveProperty('email');
    });

    /**
     * @test Create Operation - POST /users
     * @description Validates resource creation and persistence of input data in the response.
     */
    test('POST /users - Should create a new user entity', async () => {
        const newUser = {
            name: "Senior SDET Engineer",
            username: "sdet.architect",
            email: "architect@test.com"
        };

        const response = await api.post('users', newUser);
        expect(response.status()).toBe(201);

        const body = await response.json();
        expect(body.name).toBe(newUser.name);
        expect(body.id).toBeDefined(); // JSONPlaceholder returns ID 11 for new creations
    });

    /**
     * @test Update Operation - PUT /users/1
     * @description Full update of a user resource. Verifies that all fields are updated.
     */
    test('PUT /users/1 - Should perform a full update of an existing user', async () => {
        const updatedData = {
            name: "Updated Name",
            username: "updated.user",
            email: "updated@test.com"
        };

        const response = await api.put('users/1', updatedData);
        expect(response.ok()).toBeTruthy();

        const body = await response.json();
        expect(body.name).toBe(updatedData.name);
        expect(body.username).toBe(updatedData.username);
    });

    /**
     * @test Partial Update - PATCH /users/1
     * @description Verifies that only specific fields can be updated without affecting others.
     */
    test('PATCH /users/1 - Should partially update user email', async () => {
        const partialUpdate = {
            email: "partial.patch@test.com"
        };

        const response = await api.patch('users/1', partialUpdate);
        expect(response.status()).toBe(200);

        const body = await response.json();
        expect(body.email).toBe(partialUpdate.email);
        // Name should still be present in the response
        expect(body.name).toBeDefined();
    });

    /**
     * @test Delete Operation - DELETE /users/1
     * @description Validates the removal of a resource.
     */
    test('DELETE /users/1 - Should remove the user resource', async () => {
        const response = await api.delete('users/1');
        
        // Success status for deletion is usually 200 or 204
        expect(response.status()).toBe(200);
    });

    /**
     * @test Negative Scenario - GET /users/999
     * @description Ensures the API handles non-existent resources correctly with a 404.
     */
    test('GET /users/999 - Should return 404 for non-existent user', async () => {
        const response = await api.get('users/999');
        expect(response.status()).toBe(404);
    });
});