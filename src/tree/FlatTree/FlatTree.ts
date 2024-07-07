import { FLAT_TREE_NODE } from './constans';
import TreeNode from './TreeNode';
import { FlatTreeOptions, Node } from './types';

/**
 * ツリー構造の配列をフラットな配列として扱うクラス
 */
export default class FlatTree<I extends object> implements Node<I> {
  private _options: FlatTreeOptions;

  /**
   * 要素の配列
   */
  private _rootItems: I[] = [];

  /**
   * プロキシの配列
   */
  private _rootProxies: I[] = [];

  /**
   * TreeNodeの配列
   */
  private _rootNodes: TreeNode<I>[] = [];

  /**
   * 現在のフラットな配列
   */
  private _currentFlatProxies: I[];

  constructor(items: I[], options: FlatTreeOptions = {}) {
    this._options = options;
    this.addAll(items);
  }

  add(item: I) {
    const node = this._add(item);
    this._updateCurrent();
    return node;
  }

  addAll(items: I[]) {
    const nodes = items.map((item) => this._add(item));
    this._updateCurrent();
    return nodes;
  }

  private _add(item: I) {
    const node = new TreeNode(item, this._options);
    this._rootItems.push(node.getItem());
    this._rootProxies.push(node.getProxy());
    this._rootNodes.push(node);
    return node;
  }

  getItems() {
    return this._rootItems;
  }

  getProxies() {
    return this._rootProxies;
  }

  /**
   * 開いている子要素をフラットな配列として取得する
   * @returns
   */
  getFlatNodes() {
    let nodes: TreeNode<I>[] = [];
    this._rootNodes.forEach((node) => {
      nodes = nodes.concat(node.getFlatNodes());
    });
    return nodes;
  }

  /**
   * 開いている子要素のitemをフラットな配列として取得する
   * @returns
   */
  getFlatProxies() {
    if (!this._currentFlatProxies) {
      this._currentFlatProxies = this._getFlatProxies();
    }
    return this._currentFlatProxies;
  }

  /**
   * 開いている子要素のitemをフラットな配列として取得する
   * @returns
   */
  private _getFlatProxies() {
    let items: I[] = [];
    this._rootNodes.forEach((node) => {
      items = items.concat(node.getFlatProxies());
    });
    return items;
  }

  /**
   * 子要素を開く
   */
  expand(item: I[]) {
    const node: TreeNode<I> = item[FLAT_TREE_NODE];
    node.expand();
    this._updateCurrent();
  }

  /**
   * 子要素を閉じる
   */
  collapse(item: I[]) {
    const node: TreeNode<I> = item[FLAT_TREE_NODE];
    node.collapse();
    this._updateCurrent();
  }

  private _updateCurrent() {
    this._currentFlatProxies = null;
  }
}
