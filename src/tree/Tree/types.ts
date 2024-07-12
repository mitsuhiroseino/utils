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
  parent?: Node<I>;

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
  addChild(item: I): TreeNode<I>;

  /**
   * 子要素を纏めて追加する
   * @param items
   */
  addChildAll(items: I[]): TreeNode<I>[];

  /**
   * 子要素を設定する
   * @param items
   */
  setChildren(items: I[]): TreeNode<I>[];

  /**
   * 子要素を削除する
   * @param item プロキシされた子要素
   */
  removeChild(item: I): Node<I> | undefined;

  /**
   * ネストレベル
   */
  getLevel(): number;

  /**
   * 子要素の取得
   * @returns
   */
  getChildren(): I[];

  /**
   * プロキシされた子要素の取得
   * @returns
   */
  getChildProxies(): I[];

  /**
   * 子ノードの取得
   * @returns
   */
  getChildNodes(): TreeNode<I>[];

  /**
   * 開いている子要素のプロキシをフラットな配列として取得する
   */
  getFlatProxies(): I[];

  /**
   * 親を取得する
   */
  getParent(): Node<I>;

  /**
   * nodeの親であるか
   * @param node
   */
  isParentOf(node: Node<I>): boolean;

  /**
   * nodeの子であるか
   * @param node
   * @returns
   */
  isChildOf(node: Node<I>): boolean;

  /**
   * nodeの先祖であるか
   * @param node
   * @returns
   */
  isAncestorOf(node: Node<I>): boolean;

  /**
   * nodeの子孫であるか
   * @param node
   * @returns
   */
  isDescendantOf(node: Node<I>): boolean;

  /**
   * 子要素の有無
   */
  hasChildren(): boolean;

  /**
   * 子要素の開閉状態
   */
  isExpanded(): boolean;
}
