import createInsensitiveRecord from 'src/utils/object/createInsensitiveRecord';

describe('createInsensitiveRecord', () => {
  const target = {
    String: 'あ',
    Number: 1,
    Boolean: true,
    Date: new Date(1999, 0, 2, 3, 40, 56, 789),
    Array: ['A', 'B', 'C'],
    Object: { a: 0, b: 1, c: 2 },
    Null: null,
    Undefined: undefined,
  };

  test('大文字・小文字を無視', () => {
    const result = createInsensitiveRecord({ target, ignoreCase: true });
    result.STRING = 'い';
    result.boolean = false;
    delete result.NUMBER;
    result.ANY = '!!!';
    expect(result).toEqual({
      string: 'い',
      boolean: false,
      date: new Date(1999, 0, 2, 3, 40, 56, 789),
      array: ['A', 'B', 'C'],
      object: { a: 0, b: 1, c: 2 },
      null: null,
      undefined: undefined,
      any: '!!!',
    });
  });
});
