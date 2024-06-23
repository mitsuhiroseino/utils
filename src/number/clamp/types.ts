import { CORRECTION_TYPE } from './constants';

/**
 * 値の補正種別
 */
export type CorrectionType = (typeof CORRECTION_TYPE)[keyof typeof CORRECTION_TYPE];

export type ClampOptions = {
  /**
   * 値が最小値から最大値の間に収まっていない場合の動作
   * デフォルトは`clamp`
   * 何れも対応するオプション値が未指定の場合は0を返す。
   *
   * - clamp: 最大値または最小値を返す
   * - min: 最小値を返す
   * - max: 最大値を返す
   * - loop: 最大値 -> 最小値、最小値 -> 最大値に置き換えて算出した値を返す
   * - default: デフォルト値を返す。またはデフォルト値が未設定の場合は0を返す
   */
  correctionType?: CorrectionType;

  /**
   * デフォルト値
   */
  defaultValue?: number;
};
