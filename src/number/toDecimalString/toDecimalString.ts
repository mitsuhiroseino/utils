import Big from 'big.js';
import isFinite from 'lodash/isFinite';
import { ToDecimalStringOptions } from './types';

const INTERACTIVE_LIMITATION = /^-?\d*\.?\d*$/;
const INTERACTIVE_VALUE = /^-?\d+\.$/;
const BATCH_LIMITATION = /^-?\d+(\.\d+)?$/;

/**
 * 10進数の文字列に変換する
 * @param value 値
 * @param options オプション
 * @returns
 */
export default function toDecimalString(
  value: string | null | undefined,
  options: ToDecimalStringOptions = {},
): string | null | undefined {
  const {
    emptyValue = '',
    nanValue = '',
    minValue = Number.NEGATIVE_INFINITY,
    maxValue = Number.POSITIVE_INFINITY,
    precision,
    interactive = false,
  } = options;

  if (value == null || value === '') {
    return emptyValue;
  }

  if (interactive) {
    if (!INTERACTIVE_LIMITATION.test(value)) {
      return nanValue;
    } else if (value === '.' || value === '-') {
      return value;
    } else if ((precision == null || precision <= 0) && INTERACTIVE_VALUE.test(value)) {
      return value;
    }
  } else if (!BATCH_LIMITATION.test(value)) {
    return nanValue;
  }

  if (isNaN(Number(value))) {
    return nanValue;
  }

  let numberValue = new Big(value);
  if (precision != null) {
    numberValue = numberValue.round(precision, Big.roundDown);
  }

  const min = Math.min(minValue, maxValue);
  const max = Math.max(minValue, maxValue);

  if (isFinite(min) && numberValue.lt(min)) {
    return Big(min).toFixed();
  }

  if (isFinite(max) && numberValue.gt(max)) {
    return Big(max).toFixed();
  }

  return numberValue.toFixed();
}
