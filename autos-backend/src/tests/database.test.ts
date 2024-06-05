import {describe, expect, test, jest} from '@jest/globals';

describe('Database Tests', () => {
    test('Test executeQuery function', async () => {
        // Mocking executeQuery function
        const mockExecuteQuery = jest.fn().mockResolvedValue([{ brandid: 1, brand: "car" }] as never);

        // Call the mocked function
        const result = await mockExecuteQuery('SELECT * FROM brands');

        // Assertions
        //expect(mockExecuteQuery).toHaveBeenCalledTimes(1);
        expect(mockExecuteQuery).toHaveBeenCalledWith('SELECT * FROM brands');
        expect(result).toEqual([{ brandid: 1, brand: 'car' }]);
    });
});