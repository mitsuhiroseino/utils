import { DEFAULT_PROPS, TREE_NODE } from './constans';
import NodeBase from './NodeBase';
import TreeNode from './TreeNode';
import { Node, ProxiedItem, ProxyHandlers, TreeOptions } from './types';

/**
 * ツリー構造の配列を扱うクラス
 */
export default class Tree<
  I extends object,
  N extends Node<I, N> = any,
  TN extends TreeNode<I, N, TN> = any,
> extends NodeBase<I, N, TN> {
  /**
   * コンストラクター
   * @param items
   * @param options
   */
  constructor(items: I[], options: TreeOptions = {}) {
    super();
    const { childrenProp = DEFAULT_PROPS.CHILDREN, isExpandedProp, ...rest } = options;
    this._hasChildren = true;
    this._isExpanded = true;
    this._level = -1;
    const proxyHandlers = this._createProxyHandlers(childrenProp, isExpandedProp);
    this._options = { ...rest, childrenProp, isExpandedProp, proxyHandlers, parent: this.getNode() };
    this.setChildren(items);
  }

  /**
   * プロキシ用のプロパティ毎のハンドラーを作る
   * @param childrenProp
   * @param isExpandedProp
   * @returns
   */
  private _createProxyHandlers(
    childrenProp: string,
    isExpandedProp: string = DEFAULT_PROPS.IS_EXPANDED,
  ): ProxyHandlers<I, N, TN> {
    return {
      get: {
        // ノードの取得
        [TREE_NODE]: (node, prop) => node,
        // 子要素の取得
        [childrenProp]: (node, prop) => node.getChildProxies(),
        // 子要素を開閉フラグを取得
        [isExpandedProp]: (node, prop) => node.isExpanded(),
      },
      set: {},
    };
  }

  expandAll() {
    this._childNodes.forEach((child) => child.expandAll());
  }

  collapseAll() {
    this._childNodes.forEach((child) => child.collapseAll());
  }

  /**
   * 子要素を開く
   */
  expand(item: ProxiedItem<I, N, TN>) {
    const node = item[TREE_NODE];
    node.expand();
  }

  /**
   * 子要素を閉じる
   */
  collapse(item: ProxiedItem<I, N, TN>) {
    const node = item[TREE_NODE];
    node.collapse();
  }
}
