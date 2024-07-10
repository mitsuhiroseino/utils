import { FLAT_TREE_NODE } from './constans';
import NodeBase from './NodeBase';
import TreeNode from './TreeNode';
import { FlatTreeOptions } from './types';

/**
 * ツリー構造の配列をフラットな配列として扱うクラス
 */
export default class FlatTree<I extends object> extends NodeBase<I> {
  /**
   * コンストラクター
   * @param items
   * @param options
   */
  constructor(items: I[], options: FlatTreeOptions = {}) {
    super();
    const { childrenProp = 'children', isExpandedProp = 'isExpanded', ...rest } = options;
    const proxyHandlers = this._createProxyHandlers(childrenProp, isExpandedProp);
    this._options = { ...rest, childrenProp, isExpandedProp, proxyHandlers };
    this._hasChildren = true;
    this._isExpanded = true;
    this.addAll(items);
  }

  /**
   * プロキシ用のプロパティ毎のハンドラーを作る
   * @param childrenProp
   * @param isExpandedProp
   * @returns
   */
  private _createProxyHandlers(childrenProp: string, isExpandedProp: string): any {
    return {
      get: {
        // ノードの取得
        [FLAT_TREE_NODE]: (node: TreeNode<I>, prop: string) => node,
        // 子要素の取得
        [childrenProp]: (node: TreeNode<I>, prop: string) => node.getProxies(),
        // 子要素を開閉フラグを取得
        [isExpandedProp]: (node: TreeNode<I>, prop: string) => node.isExpanded(),
      },
    };
  }

  /**
   * 開いている子要素のitemをフラットな配列として取得する
   * @returns
   */
  getFlatProxies() {
    return this._getFlatProxies();
  }

  /**
   * 子要素を開く
   */
  expand(item: I[]) {
    const node: TreeNode<I> = item[FLAT_TREE_NODE];
    node.expand();
    this._commit();
  }

  /**
   * 子要素を閉じる
   */
  collapse(item: I[]) {
    const node: TreeNode<I> = item[FLAT_TREE_NODE];
    node.collapse();
    this._commit();
  }
}
