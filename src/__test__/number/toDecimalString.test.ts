import toDecimalString from 'src/number/toDecimalString';

const SMALL_VALUE = '-12345678901234567890';
const HUGE_VALUE = '12345678901234567890';

describe('toDecimalString', () => {
  describe('batch', () => {
    describe('value=null', () => {
      test('emptyValue=default', () => {
        const result = toDecimalString(null);
        expect(result).toBe('');
      });

      test('emptyValue="0"', () => {
        const result = toDecimalString(null, { emptyValue: '0' });
        expect(result).toBe('0');
      });
    });

    describe('value=undefined', () => {
      test('emptyValue=default', () => {
        const result = toDecimalString(undefined);
        expect(result).toBe('');
      });

      test('emptyValue="0"', () => {
        const result = toDecimalString(undefined, { emptyValue: '0' });
        expect(result).toBe('0');
      });
    });

    describe('value=""', () => {
      test('emptyValue=default', () => {
        const result = toDecimalString('');
        expect(result).toBe('');
      });

      test('emptyValue="0"', () => {
        const result = toDecimalString('', { emptyValue: '0' });
        expect(result).toBe('0');
      });
    });

    describe('value="a"', () => {
      test('nanValue=default', () => {
        const result = toDecimalString('a');
        expect(result).toBe('');
      });

      test('nanValue="0"', () => {
        const result = toDecimalString('a', { nanValue: '0' });
        expect(result).toBe('0');
      });
    });

    describe('isNaN(value)=true', () => {
      test('value="-"', () => {
        const result = toDecimalString('-');
        expect(result).toBe('');
      });

      test('value="."', () => {
        const result = toDecimalString('.');
        expect(result).toBe('');
      });

      test('value="1."', () => {
        const result = toDecimalString('1.');
        expect(result).toBe('');
      });

      test('value="1-"', () => {
        const result = toDecimalString('1-');
        expect(result).toBe('');
      });

      test('value="-."', () => {
        const result = toDecimalString('-.');
        expect(result).toBe('');
      });

      test('value=".-"', () => {
        const result = toDecimalString('.-');
        expect(result).toBe('');
      });

      test('value="--"', () => {
        const result = toDecimalString('--');
        expect(result).toBe('');
      });

      test('value=".."', () => {
        const result = toDecimalString('..');
        expect(result).toBe('');
      });
    });

    describe(`value="${SMALL_VALUE}"`, () => {
      test('minValue=default', () => {
        const result = toDecimalString(SMALL_VALUE);
        expect(result).toBe(SMALL_VALUE);
      });

      test('minValue=0', () => {
        const result = toDecimalString(SMALL_VALUE, { minValue: 0 });
        expect(result).toBe('0');
      });
    });

    describe(`value="${HUGE_VALUE}"`, () => {
      test('maxValue=default', () => {
        const result = toDecimalString(HUGE_VALUE);
        expect(result).toBe(HUGE_VALUE);
      });

      test('maxValue=0', () => {
        const result = toDecimalString(HUGE_VALUE, { maxValue: 0 });
        expect(result).toBe('0');
      });
    });

    describe(`value="12345.67890"`, () => {
      test('precision=default', () => {
        const result = toDecimalString('12345.67890');
        expect(result).toBe('12345.6789');
      });

      test('precision=0', () => {
        const result = toDecimalString('12345.67890', { precision: 0 });
        expect(result).toBe('12345');
      });

      test('precision=2', () => {
        const result = toDecimalString('12345.67890', { precision: 2 });
        expect(result).toBe('12345.67');
      });

      test('precision=-2', () => {
        const result = toDecimalString('12345.67890', { precision: -2 });
        expect(result).toBe('12300');
      });

      test('precision=8', () => {
        const result = toDecimalString('12345.67890', { precision: 8 });
        expect(result).toBe('12345.6789');
      });

      test('precision=-8', () => {
        const result = toDecimalString('12345.67890', { precision: -8 });
        expect(result).toBe('0');
      });
    });
  });

  describe('interactive', () => {
    describe('value=null', () => {
      test('emptyValue=default', () => {
        const result = toDecimalString(null, { interactive: true });
        expect(result).toBe('');
      });

      test('emptyValue="0"', () => {
        const result = toDecimalString(null, { interactive: true, emptyValue: '0' });
        expect(result).toBe('0');
      });
    });

    describe('value=undefined', () => {
      test('emptyValue=default', () => {
        const result = toDecimalString(undefined, { interactive: true });
        expect(result).toBe('');
      });

      test('emptyValue="0"', () => {
        const result = toDecimalString(undefined, { interactive: true, emptyValue: '0' });
        expect(result).toBe('0');
      });
    });

    describe('value=""', () => {
      test('emptyValue=default', () => {
        const result = toDecimalString('', { interactive: true });
        expect(result).toBe('');
      });

      test('emptyValue="0"', () => {
        const result = toDecimalString('', { interactive: true, emptyValue: '0' });
        expect(result).toBe('0');
      });
    });

    describe('value="a"', () => {
      test('nanValue=default', () => {
        const result = toDecimalString('a', { interactive: true });
        expect(result).toBe('');
      });

      test('nanValue="0"', () => {
        const result = toDecimalString('a', { interactive: true, nanValue: '0' });
        expect(result).toBe('0');
      });
    });

    describe('isNaN(value)=true', () => {
      test('value="-"', () => {
        const result = toDecimalString('-', { interactive: true });
        expect(result).toBe('-');
      });

      test('value="."', () => {
        const result = toDecimalString('.', { interactive: true });
        expect(result).toBe('.');
      });

      test('value="1."', () => {
        const result = toDecimalString('1.', { interactive: true });
        expect(result).toBe('1.');
      });

      test('value="1-"', () => {
        const result = toDecimalString('1-', { interactive: true });
        expect(result).toBe('');
      });

      test('value="-."', () => {
        const result = toDecimalString('-.', { interactive: true });
        expect(result).toBe('');
      });

      test('value=".-"', () => {
        const result = toDecimalString('.-', { interactive: true });
        expect(result).toBe('');
      });

      test('value="--"', () => {
        const result = toDecimalString('--', { interactive: true });
        expect(result).toBe('');
      });

      test('value=".."', () => {
        const result = toDecimalString('..', { interactive: true });
        expect(result).toBe('');
      });
    });

    describe(`value="${SMALL_VALUE}"`, () => {
      test('minValue=default', () => {
        const result = toDecimalString(SMALL_VALUE, { interactive: true });
        expect(result).toBe(SMALL_VALUE);
      });

      test('minValue=0', () => {
        const result = toDecimalString(SMALL_VALUE, { interactive: true, minValue: 0 });
        expect(result).toBe('0');
      });
    });

    describe(`value="${HUGE_VALUE}"`, () => {
      test('maxValue=default', () => {
        const result = toDecimalString(HUGE_VALUE, { interactive: true });
        expect(result).toBe(HUGE_VALUE);
      });

      test('maxValue=0', () => {
        const result = toDecimalString(HUGE_VALUE, { interactive: true, maxValue: 0 });
        expect(result).toBe('0');
      });
    });

    describe(`value="12345.67890"`, () => {
      test('precision=default', () => {
        const result = toDecimalString('12345.67890', { interactive: true });
        expect(result).toBe('12345.6789');
      });

      test('precision=0', () => {
        const result = toDecimalString('12345.67890', { interactive: true, precision: 0 });
        expect(result).toBe('12345');
      });

      test('precision=2', () => {
        const result = toDecimalString('12345.67890', { interactive: true, precision: 2 });
        expect(result).toBe('12345.67');
      });

      test('precision=-2', () => {
        const result = toDecimalString('12345.67890', { interactive: true, precision: -2 });
        expect(result).toBe('12300');
      });

      test('precision=8', () => {
        const result = toDecimalString('12345.67890', { interactive: true, precision: 8 });
        expect(result).toBe('12345.6789');
      });

      test('precision=-8', () => {
        const result = toDecimalString('12345.67890', { interactive: true, precision: -8 });
        expect(result).toBe('0');
      });
    });
  });
});
