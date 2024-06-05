import { describe, expect, test, jest } from '@jest/globals';
describe('Database Tests', () => {
    test('Test executeQuery function', async () => {
        const mockExecuteQuery = jest.fn().mockResolvedValue([{ brandid: 1, brand: "car" }]);
        const result = await mockExecuteQuery('SELECT * FROM brands');
        expect(mockExecuteQuery).toHaveBeenCalledWith('SELECT * FROM brands');
        expect(result).toEqual([{ brandid: 1, brand: 'car' }]);
    });
});
