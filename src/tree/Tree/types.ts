import TreeNode from './TreeNode';
import { TREE_NODE } from './constans';

/**
 * Treeのオプション
 */
export type TreeOptions = NodeOptionsBase & {};

/**
 * TreeNodeのオプション
 */
export type TreeNodeOptions<I extends object, N extends Node<I, N> = any> = NodeOptionsBase & {
  /**
   * 親ノード
   */
  parent?: N;

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

export interface Node<I extends object, N extends Node<I, N> = any, TN extends TreeNode<I, N, TN> = any> {
  /**
   * 子要素を追加する
   * @param item
   */
  addChild(item: I): TN;

  /**
   * 子要素を纏めて追加する
   * @param items
   */
  addChildAll(items: I[]): TN[];

  /**
   * 子要素を設定する
   * @param items
   */
  setChildren(items: I[]): TN[];

  /**
   * 子要素を削除する
   * @param item プロキシされた子要素
   */
  removeChild(item: I): TN | undefined;

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
  getChildProxies(): ProxiedItem<I, N, TN>[];

  /**
   * 開いている子要素のプロキシをフラットな配列として取得
   * @returns
   */
  getFlatChildProxies(): ProxiedItem<I, N, TN>[];

  /**
   * 子ノードの取得
   * @returns
   */
  getChildNodes(): TN[];

  /**
   * nodeの親であるか
   * @param node
   */
  isParentOf(node: N): boolean;

  /**
   * nodeの子であるか
   * @param node
   * @returns
   */
  isChildOf(node: N): boolean;

  /**
   * nodeの先祖であるか
   * @param node
   * @returns
   */
  isAncestorOf(node: N): boolean;

  /**
   * nodeの子孫であるか
   * @param node
   * @returns
   */
  isDescendantOf(node: N): boolean;

  /**
   * 子要素の有無
   */
  hasChildren(): boolean;

  /**
   * 子要素の開閉状態
   */
  isExpanded(): boolean;

  /**
   * 行自体の表示／非表示、並び順などに影響する状態変更をした際に実行するメソッド
   */
  handleStateChange(): boolean;
}

/**
 * プロキシで処理を行うハンドラー
 */
export type ProxyHandlers<I extends object, N extends Node<I, N> = any, TN extends TreeNode<I, N, TN> = any> = {
  get: {
    [key: string | symbol]: (node: TN, prop: string | symbol) => unknown;
  };
  set: {
    [key: string | symbol]: (node: TN, prop: string | symbol, newValue: unknown) => boolean;
  };
};

export type ProxiedItem<I extends object, N extends Node<I, N> = any, TN extends TreeNode<I, N, TN> = any> = I & {
  /**
   * ツリーノード
   */
  [TREE_NODE]: TN;
};
