import getAnyKey from '../../collection/getAnyKey';
import getDistance1D from '../getDistance1D';
import { GetDiff2DOptions } from './types';

const KEY_X = 'x',
  KEY_Y = 'y';

/**
 * 始点と終点の各座標の差を求める
 * @param start 始点
 * @param end 終点
 * @param options オプション
 * @returns 始点と終点の各座標の差
 */
export default function getDiff2D(start: any, end: any, options: GetDiff2DOptions = {}) {
  const {
      abs,
      keysX = KEY_X,
      loopX,
      minValueX,
      maxValueX,
      keysY = KEY_Y,
      loopY,
      minValueY,
      maxValueY,
      keyX = KEY_X,
      keyY = KEY_Y,
      extraOptions,
      ...options1D
    } = options,
    startKeyX = getAnyKey(start, keysX) || KEY_X,
    endKeyX = getAnyKey(end, keysX) || KEY_X,
    diffX = getDistance1D(start[startKeyX], end[endKeyX], {
      loop: loopX,
      minValue: minValueX,
      maxValue: maxValueX,
      extraOptions: { axis: keyX, ...extraOptions },
      ...options1D,
    }),
    startKeyY = getAnyKey(start, keysY) || KEY_Y,
    endKeyY = getAnyKey(end, keysY) || KEY_Y,
    diffY = getDistance1D(start[startKeyY], end[endKeyY], {
      loop: loopY,
      minValue: minValueY,
      maxValue: maxValueY,
      extraOptions: { axis: keyY, ...extraOptions },
      ...options1D,
    });

  return abs ? { [keyX]: Math.abs(diffX), [keyY]: Math.abs(diffY) } : { [keyX]: diffX, [keyY]: diffY };
}
