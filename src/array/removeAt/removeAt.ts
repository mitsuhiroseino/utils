import isEmpty from 'lodash/isEmpty';

/**
 * 指定の位置の要素を削除します。
 * @param array
 * @param index
 * @param size
 */
export default function removeAt<T>(array: T[], index: number, size: number = 1): T[] {
  if (!isEmpty(array) && size > 0) {
    array.splice(index, size);
  }
  return array;
}
