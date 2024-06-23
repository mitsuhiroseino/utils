import { ClampOptions } from './types';

/**
 * 指定の範囲に収まるよう値を調整する
 * @param value 値
 * @param min 最小値
 * @param max 最大値
 * @returns
 */
export default function clamp(value: number, min: number, max: number, options: ClampOptions = {}) {
  const { correctionType = 'clamp', defaultValue = 0 } = options,
    minValue = Math.min(min, max),
    maxValue = Math.max(min, max),
    isUnderflow = value < minValue,
    isOverflow = value > maxValue;

  if (isUnderflow || isOverflow) {
    // 範囲外
    if (correctionType === 'clamp') {
      if (isUnderflow) {
        // 最小値よりも小さい
        return minValue;
      } else {
        // 最大値よりも大きい
        return maxValue;
      }
    } else if (correctionType === 'min') {
      // 最小値に補正
      return minValue;
    } else if (correctionType === 'max') {
      // 最大値に補正
      return maxValue;
    } else if (correctionType === 'loop') {
      // ループして補正
      return _loop(value, minValue, maxValue, Math.abs(maxValue - minValue));
    } else {
      // デフォルト値に補正
      return defaultValue;
    }
  } else {
    // 範囲内
    return value;
  }
}

/**
 * 指定の範囲に収まるよう値を調整する
 * @param value 値
 * @param min 最小値
 * @param max 最大値
 * @param range 値の範囲
 * @returns
 */
function _loop(value: number, min: number, max: number, range: number) {
  while (value < min || value > max) {
    // 範囲外の間は繰り返し
    if (value < min) {
      // 最小値を下回っている場合
      value += range;
    } else if (value > max) {
      // 最大値を上回っている場合
      value -= range;
    }
  }
  // 収まっている場合
  return value;
}

// TODO
function _wrap(value: number, min: number, max: number, range: number) {
  if (value >= min && value <= max) {
    // 収まっている場合
    return value;
  }

  let reverse;
  while (value < min || value > max) {
    // 範囲外の間は繰り返し
    if (value < min) {
      // 最小値を下回っている場合
      value += range;
      reverse = false;
    } else if (value > max) {
      // 最大値を上回っている場合
      value -= range;
      reverse = true;
    }
  }
  return reverse ? max - value : value;
}
