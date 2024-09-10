import Big from 'big.js';
import isFinite from 'lodash/isFinite';
import isNumber from 'lodash/isNumber';
import { ToDecimalStringOptions } from './types';

const INTERACTIVE_LIMITATION = /^-?\d*\.?\d*$/;
const INTERACTIVE_VALUE = /^-?\d+\.$/;
const BATCH_LIMITATION = /^-?\d+(\.\d+)?$/;
const DEFAULT_PE = Big.PE;
const DEFAULT_NE = Big.NE;
const E = 1000;

const toReturnValue = (value: Big | number | string | null | undefined): string | null | undefined => {
  if (isNumber(value)) {
    value = new Big(value);
  }
  if (value instanceof Big) {
    Big.PE = E;
    Big.NE = -E;
    const returnValue = value.toString();
    Big.PE = DEFAULT_PE;
    Big.NE = DEFAULT_NE;
    return returnValue;
  } else {
    return value;
  }
};

/**
 * 10進数の文字列に変換する
 * @param value 値
 * @param options オプション
 * @returns
 */
export default function toDecimalString(
  value: number | string | null | undefined,
  options: ToDecimalStringOptions = {},
): string | null | undefined {
  const {
    empty = '',
    nan = '',
    min = Number.NEGATIVE_INFINITY,
    max = Number.POSITIVE_INFINITY,
    precision,
    interactive = false,
    clampToMin,
    clampToMax,
  } = options;

  if (value == null || value === '') {
    return toReturnValue(empty);
  }

  if (!isNumber(value)) {
    if (interactive) {
      if (!INTERACTIVE_LIMITATION.test(value)) {
        return toReturnValue(nan);
      } else if (value === '.' || value === '-') {
        return value;
      } else if ((precision == null || precision <= 0) && INTERACTIVE_VALUE.test(value)) {
        return value;
      }
    } else if (!BATCH_LIMITATION.test(value)) {
      return toReturnValue(nan);
    }
  }

  if (isNaN(Number(value))) {
    return toReturnValue(nan);
  }

  let numberValue = new Big(value);
  if (precision != null) {
    numberValue = numberValue.round(precision, Big.roundDown);
  }

  const minValue = Math.min(min, max);
  const maxValue = Math.max(min, max);

  if (isFinite(minValue) && numberValue.lt(minValue)) {
    if (clampToMin) {
      return toReturnValue(minValue);
    } else {
      return toReturnValue(nan);
    }
  }

  if (isFinite(maxValue) && numberValue.gt(maxValue)) {
    if (clampToMax) {
      return toReturnValue(maxValue);
    } else {
      return toReturnValue(nan);
    }
  }

  return toReturnValue(numberValue);
}
