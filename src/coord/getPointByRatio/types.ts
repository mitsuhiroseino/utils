import { CorrectionType } from '../../number/clamp';
import { CalcPathDistanceOptions } from '../calcPathDistance';
import { CalcPathDistanceRatioResult } from '../calcPathDistanceRatio';

/**
 * 入力
 */
export type GetPointByRatioInput = CalcPathDistanceRatioResult;

/**
 * オプション
 */
export type GetPointByRatioOptions = CalcPathDistanceOptions & {
  /**
   * trueの場合は指定のratio以下のpointを返す
   * falseの場合は指定のratioに一致するpointを作成し返す
   */
  step?: boolean;

  /**
   * ratio算出の起点となるindex
   * この点をratio=0として算出したratioを基に点を取得する
   */
  startIndex?: number;

  /**
   * X軸の値の範囲に制限がある場合の補正種別
   * 未指定の場合は`clamp`
   */
  correctionTypeX?: CorrectionType;

  /**
   * X軸の補正種別が`defalut`の場合のデフォルト値
   */
  defaultValueX?: number;

  /**
   * Y軸の値の範囲に制限がある場合の補正種別
   * 未指定の場合は`clamp`
   */
  correctionTypeY?: CorrectionType;

  /**
   * Y軸の補正種別が`defalut`の場合のデフォルト値
   */
  defaultValueY?: number;
};

/**
 * 結果
 */
export type GetPointByRatioResult = CalcPathDistanceRatioResult;
