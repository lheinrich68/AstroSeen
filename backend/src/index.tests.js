import request from 'supertest';
import app from './index.js';

describe('GET /api/health', () => {
    it("Répond avec un statut OK", async () => {
        const response = await request(app).get('/api/health');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ status: 'OK!' });
    });
})