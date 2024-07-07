import TreeNode from './TreeNode';

/**
 * FlatTreeのオプション
 */
export type FlatTreeOptions = NodeOptionsBase & {};

/**
 * TreeNodeのオプション
 */
export type TreeNodeOptions<I extends object> = NodeOptionsBase & {
  /**
   * 親ノード
   */
  parent?: TreeNode<I>;

  /**
   * プロキシのハンドラー
   */
  proxyHandlers?: any;
};

/**
 * 機能共通のオプション
 */
export type NodeOptionsBase = {
  /**
   * 子要素の配列が設定されている配列要素のプロパティの名称
   * デフォルトはchildren
   */
  childrenProp?: string;

  /**
   * 子要素が開かれているか判断をするプロパティの名称
   * デフォルトはisExpanded
   */
  isExpandedProp?: string;
};

export interface Node<I extends object> {
  /**
   * 子要素を追加する
   * @param item
   */
  add(item: I): Node<I>;

  /**
   * 子要素を纏めて追加する
   * @param items
   */
  addAll(items: I[]): Node<I>[];

  /**
   * 子要素を取得する
   */
  getFlatProxies(): I[];

  /**
   * 子要素のプロキシを取得する
   */
  getProxies(): I[];

  /**
   * 開いている子要素のノードをフラットな配列として取得する
   */
  getFlatNodes(): Node<I>[];

  /**
   * 開いている子要素のプロキシをフラットな配列として取得する
   */
  getFlatProxies(): I[];
}
