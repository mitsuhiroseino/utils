import removeAt from '../../array/removeAt';
import TreeNode from './TreeNode';
import { Node, TreeNodeOptions } from './types';

/**
 * ツリー構造の配列をフラットな配列として扱うクラスの基底クラス
 */
export default abstract class NodeBase<I extends object> implements Node<I> {
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
  protected _childProxies: I[];

  /**
   * 子ノード
   */
  protected _childNodes?: TreeNode<I>[];

  /**
   * 現在のフラットな配列
   */
  protected _flatProxies: I[];

  /**
   * 親ノード
   */
  protected _parent: Node<I>;

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
  protected _options: TreeNodeOptions<I>;

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
    const node = new TreeNode(item, this._options);
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
   * 子ノードの取得
   * @returns
   */
  getChildNodes() {
    return this._childNodes;
  }

  /**
   * 開いている子要素のitemをフラットな配列として取得する
   * @returns
   */
  abstract getFlatProxies(): I[];

  /**
   * 開いている子要素のitemをフラットな配列として取得する
   * @param proxy 自身のプロキシ
   * @returns
   */
  protected _getFlatProxies(proxy?: I) {
    if (this._flatProxies) {
      return this._flatProxies;
    }

    let flatProxies: I[] = proxy ? [proxy] : [];
    if (this._hasChildren && this._childNodes && this._isExpanded) {
      this._childNodes.forEach((child) => {
        flatProxies = flatProxies.concat(child.getFlatProxies());
      });
    }

    this._flatProxies = flatProxies;
    return flatProxies;
  }

  /**
   * フラットなプロキシに更新が必要になる場合に実行するメソッド
   */
  protected _commit() {
    this._flatProxies = null;
    this._flatProxies = this.getFlatProxies();
  }

  getParent(): Node<I> {
    return this._parent;
  }

  /**
   * nodeの親であるか
   * @param node
   */
  isParentOf(node: Node<I>) {
    return node.isChildOf(this);
  }

  /**
   * nodeの子であるか
   * @param node
   * @returns
   */
  isChildOf(node: Node<I>) {
    return this._parent === node;
  }

  /**
   * nodeの先祖であるか
   * @param node
   * @returns
   */
  isAncestorOf(node: Node<I>) {
    return node.isDescendantOf(this);
  }

  /**
   * nodeの子孫であるか
   * @param node
   * @returns
   */
  isDescendantOf(node: Node<I>) {
    const parent = this._parent;
    if (parent === node) {
      return true;
    } else if (parent) {
      return parent.isDescendantOf(node);
    } else {
      return false;
    }
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
