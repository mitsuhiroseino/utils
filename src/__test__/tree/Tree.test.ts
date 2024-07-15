import cloneDeep from 'lodash/cloneDeep';
import omit from 'lodash/omit';
import Tree from 'src/tree/Tree';
import { ITEMS } from './constants';
import logChildren from './logChildren';
import toEqualNodesWith from './toEqualNodesWith';

describe('Tree', () => {
  test('children', () => {
    const items = cloneDeep(ITEMS);
    const tree = new Tree(items, {});
    const result = tree.getChildren();
    expect(result).toEqual(items);
  });

  test('childProxies', () => {
    const items = cloneDeep(ITEMS);
    const tree = new Tree(items, {});
    const result = tree.getChildProxies();
    expect(result).toEqual(items);
  });

  test('childNodes', () => {
    const items = cloneDeep(ITEMS);
    const tree = new Tree(items, {});
    const result = tree.getChildNodes();
    expect(toEqualNodesWith(items, result)).toBe(true);
  });
});
