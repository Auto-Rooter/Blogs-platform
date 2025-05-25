import request from "supertest";
import app from "../src/app";

describe('Auth API', () => {
    it('rejects bad login', async ()=>{
        const res = await request(app).post('/auth/login').send({ username: 'whoami', password: 'totallyWrongPassword' });
        expect(res.status).toBe(401);
    });
});