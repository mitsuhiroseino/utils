import removeAt from '../../array/removeAt';
import TreeNode from './TreeNode';
import { Node, ProxiedItem, TreeNodeOptions } from './types';

/**
 * ツリー構造の配列をフラットな配列として扱うクラスの基底クラス
 */
export default abstract class NodeBase<
  I extends object,
  N extends Node<I, N> = any,
  TN extends TreeNode<I, N, TN> = any,
> implements Node<I, N, TN>
{
  /**
   * ネストレベル
   */
  protected _level: number;

  /**
   * 子要素
   */
  protected _children: I[];

  /**
   * プロキシされた子要素
   */
  protected _childProxies: ProxiedItem<I, N, TN>[];

  /**
   * 展開状態を考慮した子要素のフラットな配列
   */
  protected _flatChildProxies: ProxiedItem<I, N, TN>[];

  /**
   * 子ノード
   */
  protected _childNodes?: TN[];

  /**
   * 子要素の有無
   */
  protected _hasChildren = false;

  /**
   * 子要素の開閉状態
   */
  protected _isExpanded = false;

  /**
   * 子要素用のオプション
   */
  protected _options: TreeNodeOptions<I, N>;

  /**
   * 子要素を追加する
   * @param item
   * @returns
   */
  addChild(item: I) {
    const node = this._addChild(item);
    this._commit();
    return node;
  }

  /**
   * 子要素を纏めて追加する
   * @param items
   * @returns
   */
  addChildAll(items: I[]) {
    const nodes = items.map((item) => this._addChild(item));
    this._commit();
    return nodes;
  }

  removeChild(item: I) {
    const index = this._childProxies.findIndex((child) => child === item);
    if (index > -1) {
      removeAt(this._children, index);
      removeAt(this._childProxies, index);
      return removeAt(this._childNodes, index)[0];
    }
    return;
  }

  /**
   * 子要素を設定する
   * @param items
   * @returns
   */
  setChildren(items: I[]) {
    this._children = [];
    this._childProxies = [];
    this._childNodes = [];
    return this.addChildAll(items);
  }

  /**
   * 子要素を追加する
   * @param item
   * @returns
   */
  private _addChild(item: I) {
    const node = new TreeNode(item, this._options) as TN;
    this._children.push(item);
    this._childProxies.push(node.getProxy());
    this._childNodes.push(node);
    return node;
  }

  /**
   * レベルの取得
   * @returns
   */
  getLevel() {
    return this._level;
  }

  /**
   * ノードを取得
   * @returns
   */
  getNode(): N {
    return this as unknown as N;
  }

  /**
   * 子要素の取得
   * @returns
   */
  getChildren() {
    return this._children;
  }

  /**
   * プロキシされた子要素の取得
   * @returns
   */
  getChildProxies() {
    return this._childProxies;
  }

  /**
   * 開いている子要素のitemをフラットな配列として取得
   * @returns
   */
  getFlatChildProxies() {
    if (this._flatChildProxies) {
      return this._flatChildProxies;
    }

    let flatChildProxies: ProxiedItem<I, N, TN>[] = [];
    if (this._hasChildren && this._childNodes && this._isExpanded) {
      this._childNodes.forEach((child) => {
        flatChildProxies = flatChildProxies.concat(child.getFlatChildProxies());
      });
    }

    this._flatChildProxies = flatChildProxies;
    return flatChildProxies;
  }

  /**
   * 子ノードの取得
   * @returns
   */
  getChildNodes() {
    return this._childNodes;
  }

  /**
   * ソート、フィルタに影響のある変更をした場合に実行するメソッド
   */
  protected _commit() {
    this._flatChildProxies = null;
    this._flatChildProxies = this.getFlatChildProxies();
  }

  /**
   * nodeの親であるか
   * @param node
   */
  isParentOf(node: N) {
    return node.isChildOf(this as unknown as N);
  }

  /**
   * nodeの子であるか
   * @param node
   * @returns
   */
  isChildOf(node: N) {
    return false;
  }

  /**
   * nodeの先祖であるか
   * @param node
   * @returns
   */
  isAncestorOf(node: N) {
    return node.isDescendantOf(this as unknown as N);
  }

  /**
   * nodeの子孫であるか
   * @param node
   * @returns
   */
  isDescendantOf(node: N) {
    return false;
  }

  /**
   * 子要素の有無
   */
  hasChildren() {
    return this._hasChildren;
  }

  /**
   * 子要素の開閉状態
   */
  isExpanded() {
    return this._isExpanded;
  }
}
