/**
 * 値の補正種別
 */
export const CORRECTION_TYPE = {
  /**
   * 最大値または最小値に補正
   */
  CLAMP: 'clamp',

  /**
   * 最小値に補正
   */
  MIN: 'min',

  /**
   * 最大値に補正
   */
  MAX: 'max',

  /**
   * 最大値と最小値が繋がっている想定で算出した値に補正
   */
  LOOP: 'loop',

  /**
   * デフォルト値に補正
   */
  DEFAULT: 'default',
};
