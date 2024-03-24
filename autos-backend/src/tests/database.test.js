describe('Database Tests', () => {
    test('Test executeQuery function', async () => {
        const mockExecuteQuery = jest.fn().mockResolvedValue([{ brandid: 4, brand: 'Skoda' }]);
        const result = await mockExecuteQuery('SELECT * FROM brands');
        expect(mockExecuteQuery).toHaveBeenCalledWith('SELECT * FROM brands');
        expect(result).toEqual([{ brandid: 4, brand: 'Skoda' }]);
    });
});
export {};
