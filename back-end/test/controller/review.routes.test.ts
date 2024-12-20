import request from 'supertest';
import app from '../../app';
import { PrismaClient } from '@prisma/client';

jest.mock('@prisma/client');
const mockPrisma = {
  movie: { findUnique: jest.fn() },
  review: { findUnique: jest.fn(), create: jest.fn() },
};
(PrismaClient as jest.Mock).mockImplementation(() => mockPrisma);

const prisma = new PrismaClient();

describe('Review Router', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('POST /reviews', () => {
        it('should create a review successfully', async () => {
            prisma.movie.findUnique = jest.fn().mockResolvedValue({ id: 1, title: 'Inception' });
            prisma.review.create = jest.fn().mockResolvedValue({
                id: 1,
                text: 'Amazing movie!',
                rating: 5,
                userId: 1,
                movieId: 1,
            });

            const response = await request(app)
                .post('/reviews')
                .send({
                    movieId: 1,
                    rating: 5,
                    text: 'Amazing movie!',
                });

            expect(response.status).toBe(201);
            expect(response.body.message).toBe('Review created successfully.');
        });

        it('should return 400 for missing fields', async () => {
            const response = await request(app).post('/reviews').send({
                rating: 5,
                text: 'Missing movieId and userId',
            });

            expect(response.status).toBe(400);
            expect(response.body.message).toBe('All fields are required.');
        });

        it('should return 404 for nonexistent movie', async () => {
            prisma.movie.findUnique = jest.fn().mockResolvedValue(null);

            const response = await request(app).post('/reviews').send({
                movieId: 999,
                rating: 5,
                text: 'Invalid movieId',
            });

            expect(response.status).toBe(404);
            expect(response.body.message).toBe('Movie not found.');
        });

        it('should return 400 for invalid rating', async () => {
            const response = await request(app).post('/reviews').send({
                movieId: 1,
                rating: 6,
                text: 'Bad rating',
            });

            expect(response.status).toBe(400);
            expect(response.body.message).toBe('Rating must be between 1 and 5.');
        });
    });

    describe('GET /reviews/:id', () => {
        it('should fetch a review successfully', async () => {
            prisma.review.findUnique = jest.fn().mockResolvedValue({
                id: 1,
                text: 'Amazing movie!',
                rating: 5,
                userId: 1,
                movieId: 1,
            });

            const response = await request(app).get('/reviews/1');

            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                id: 1,
                text: 'Amazing movie!',
                rating: 5,
                userId: 1,
                movieId: 1,
            });
        });

        it('should return 404 for nonexistent review', async () => {
            prisma.review.findUnique = jest.fn().mockResolvedValue(null);

            const response = await request(app).get('/reviews/999');

            expect(response.status).toBe(404);
            expect(response.body.message).toBe('Review not found.');
        });

        it('should return 400 for invalid ID', async () => {
            const response = await request(app).get('/reviews/invalid');

            expect(response.status).toBe(400);
            expect(response.body.message).toBe('Invalid ID or failed to fetch review.');
        });
    });
});
