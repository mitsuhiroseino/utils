import find from 'lodash/find';
import slice from 'lodash/slice';
import getAnyValue from '../../collection/getAnyValue';
import clamp from '../../number/clamp';
import getValidMinMax from '../../number/getValidMinMax';
import restrictRange from '../../number/restrictRange';
import calcPathDistance from '../calcPathDistance';
import calcPathDistanceRatio from '../calcPathDistanceRatio';
import getDiff2D from '../getDiff2D';
import getDistance2D from '../getDistance2D';
import { GetPointByRatioInput, GetPointByRatioOptions, GetPointByRatioResult } from './types';

const KEY_X = 'x',
  KEY_Y = 'y';

/**
 * 経路(点の配列)を基に指定の割合の位置を返す
 * @param path 経路
 * @param ratio 始点からの割合(0～1)
 * @param options オプション
 * @returns 指定の割合に対応する位置
 */
export default function getPointByRatio(
  path: GetPointByRatioInput[],
  ratio: number,
  options: GetPointByRatioOptions = {},
): GetPointByRatioResult {
  const {
      startIndex = 0,
      step,
      keysX = KEY_X,
      keysY = KEY_Y,
      keyX = KEY_X,
      keyY = KEY_Y,
      getDistance = getDistance2D,
      ...rest
    } = options,
    opts = { keysX, keysY, keyX, keyY, getDistance, ...rest },
    pathWithDistance = calcPathDistance(path, opts),
    targetPath = slice(pathWithDistance, startIndex),
    length = targetPath.length;

  if (length < 1) {
    // 長さを算出するには最低でも2点必要
    return;
  }

  // ratioを算出
  const points = calcPathDistanceRatio(targetPath);
  // ratioは0～1の範囲
  ratio = restrictRange(ratio, 0, 1);
  if (step) {
    // 指定のratio以下の点を取得
    return _getMaxPointAtOrBelowRatio(points, ratio);
  } else {
    // 指定のratioを含むパスの終点を取得
    const point = _getMinPointAtOrAboveRatio(points, ratio);
    if (point.ratio === ratio) {
      // 対象のratioに対応する点がある場合
      return point;
    } else {
      // 対象のratioに対応する点がある場合は、それにあたる点を作成する
      const previousIndex = point.index - 1,
        // rario=0以外の場合は必ずpreviousPointが存在するので、ここで取得すれば必ずある
        previousPoint = find(targetPath, { index: previousIndex });
      // ratioに合致するpointを作って返す
      return calcNewPointAtRatio(ratio, point, previousPoint, opts);
    }
  }
}

/**
 * ratioに対応する点を算出する
 * @param ratio 割合
 * @param point 指定の割合以上の最小の点
 * @param previousPoint 指定の割合未満の最大の点
 * @param options オプション
 * @returns
 */
function calcNewPointAtRatio(
  ratio: number,
  point: GetPointByRatioInput,
  previousPoint: GetPointByRatioInput,
  options: Required<Pick<GetPointByRatioOptions, 'getDistance' | 'keysX' | 'keysY' | 'keyX' | 'keyY'>> &
    GetPointByRatioOptions,
): GetPointByRatioResult {
  // 前の点から目的の点の割合の差
  const { keysX, keysY, keyX, keyY, getDistance, ...rest } = options;
  const ratioDiff = point.ratio - previousPoint.ratio;
  // 割合の差の割合
  const ratioRatio = (ratio - previousPoint.ratio) / ratioDiff;
  // 前の点からの差
  const diff = getDiff2D(previousPoint, point, { keysX, keysY, ...rest });
  // 前の点に前の点からの差の指定割合の割合をかければ欲しい点になる
  const x = getNormalizedValue(getAnyValue(previousPoint, keysX) + diff.x * ratioRatio, 'X', options);
  const y = getNormalizedValue(getAnyValue(previousPoint, keysY) + diff.y * ratioRatio, 'Y', options);
  const newPoint = { ...point, [keyX]: x, [keyY]: y };
  // 距離を算出
  const distanceDelta = getDistance(previousPoint, newPoint, options);

  newPoint.distanceDelta = distanceDelta;
  newPoint.distance = previousPoint.distance + distanceDelta;
  newPoint.ratio = ratio;

  return newPoint;
}

/**
 * 指定範囲内の値に補正する
 * @param value
 * @param axis
 * @param options
 * @returns
 */
function getNormalizedValue(value: number, axis: string, options: GetPointByRatioOptions): number {
  const min = options[`minValue${axis}`],
    max = options[`minValue${axis}`];
  if (min != null && max != null) {
    // 補正あり
    const [minValue, maxValue] = getValidMinMax(min, max),
      correctionType = options[`correctionType${axis}`],
      defaultValue = options[`defaultValue${axis}`];
    return clamp(value, minValue, maxValue, { correctionType, defaultValue });
  } else {
    // 補正なし
    return value;
  }
}

/**
 * 経路(位置情報の配列)を基に指定の割合以下になる最大の位置を返す
 * @param path 経路
 * @param ratio 始点からの割合(0～1)
 * @returns 指定の割合以下になる位置
 */
function _getMaxPointAtOrBelowRatio(path: GetPointByRatioInput[], ratio: number) {
  path = path.reverse();
  for (const point of path) {
    if (point.ratio <= ratio) {
      return point;
    }
  }
}

/**
 * 経路(位置情報の配列)を基に指定の割合以上になる最小の位置を返す
 * @param path 経路
 * @param ratio 始点からの割合(0～1)
 * @returns 指定の割合以上になる位置
 */
function _getMinPointAtOrAboveRatio(path: GetPointByRatioInput[], ratio: number) {
  for (const point of path) {
    if (ratio <= point.ratio) {
      return point;
    }
  }
}
