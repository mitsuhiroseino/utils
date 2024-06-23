import { GetDistance1DOptions } from '../getDistance1D';

/**
 * オプション
 */
export type GetDiff2DOptions = Omit<GetDistance1DOptions, 'loop' | 'minValue' | 'maxValue'> & {
  /**
   * X軸の値を持つプロパティのキー
   * 未指定の場合は`x`
   */
  keysX?: string | number | (string | number)[];

  /**
   * X軸が最小値～最大値の間でループしていることを想定して距離を算出する
   */
  loopX?: boolean;

  /**
   * X軸の下限
   * loopX=trueの場合必須
   */
  minValueX?: number;

  /**
   * X軸の上限
   * loopX=trueの場合必須
   */
  maxValueX?: number;

  /**
   * Y軸の値を持つプロパティのキー
   * 未指定の場合は`y`
   */
  keysY?: string | number | (string | number)[];

  /**
   * Y軸が最小値～最大値の間でループしていることを想定して距離を算出する
   */
  loopY?: boolean;

  /**
   * Y軸の下限
   * loopY=trueの場合必須
   */
  minValueY?: number;

  /**
   * Y軸の上限
   * loopY=trueの場合必須
   */
  maxValueY?: number;

  /**
   * 戻り値でX軸の値を持つプロパティ
   * デフォルトは`x`
   */
  keyX?: string;

  /**
   * 戻り値でY軸の値を持つプロパティ
   * デフォルトは`y`
   */
  keyY?: string;
};
