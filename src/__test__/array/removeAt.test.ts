import removeAt from 'src/utils/array/removeAt';

describe('removeAt', () => {
  describe('1要素', () => {
    test('先頭', () => {
      const array: any[] = [0, 1, 2, 3, 4];
      removeAt(array, 0);
      expect(array).toEqual([1, 2, 3, 4]);
    });

    test('中盤', () => {
      const array: any[] = [0, 1, 2, 3, 4];
      removeAt(array, 2);
      expect(array).toEqual([0, 1, 3, 4]);
    });

    test('末尾', () => {
      const array: any[] = [0, 1, 2, 3, 4];
      removeAt(array, 4);
      expect(array).toEqual([0, 1, 2, 3]);
    });

    test('先頭以前', () => {
      const array: any[] = [0, 1, 2, 3, 4];
      removeAt(array, -10);
      expect(array).toEqual([1, 2, 3, 4]);
    });

    test('末尾以降', () => {
      const array: any[] = [0, 1, 2, 3, 4];
      removeAt(array, 10);
      expect(array).toEqual([0, 1, 2, 3, 4]);
    });
  });

  describe('複数要素', () => {
    test('先頭', () => {
      const array: any[] = [0, 1, 2, 3, 4];
      removeAt(array, 0, 3);
      expect(array).toEqual([3, 4]);
    });

    test('中盤', () => {
      const array: any[] = [0, 1, 2, 3, 4];
      removeAt(array, 1, 3);
      expect(array).toEqual([0, 4]);
    });

    test('末尾', () => {
      const array: any[] = [0, 1, 2, 3, 4];
      removeAt(array, 2, 3);
      expect(array).toEqual([0, 1]);
    });

    test('先頭以前', () => {
      const array: any[] = [0, 1, 2, 3, 4];
      removeAt(array, -10, 3);
      expect(array).toEqual([3, 4]);
    });

    test('末尾以降', () => {
      const array: any[] = [0, 1, 2, 3, 4];
      removeAt(array, 5, 3);
      expect(array).toEqual([0, 1, 2, 3, 4]);
    });
  });
});
