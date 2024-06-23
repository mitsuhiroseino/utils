import isEnclosedIn from 'src/utils/string/isEnclosedIn';

describe('isEnclosedIn', () => {
  describe('prefix === suffix', () => {
    test('true', () => {
      const result = isEnclosedIn('"abc"', '"');
      expect(result).toBe(true);
    });
    test('false', () => {
      const result = isEnclosedIn('"abc"', "'");
      expect(result).toBe(false);
    });
  });
  describe('prefix !== suffix', () => {
    test('true', () => {
      const result = isEnclosedIn('{abc}', '{', '}');
      expect(result).toBe(true);
    });
    test('false', () => {
      const result = isEnclosedIn('[abc]', '{', '}');
      expect(result).toBe(false);
    });
  });
});
