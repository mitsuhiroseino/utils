import TreeNode from './TreeNode';
import { Node, TreeNodeOptions } from './types';

/**
 * ツリー構造の配列をフラットな配列として扱うクラスの基底クラス
 */
export default abstract class NodeBase<I extends object> implements Node<I> {
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

  /**
   * 子要素を追加する
   * @param item
   * @returns
   */
  add(item: I) {
    const node = this._add(item);
    this._commit();
    return node;
  }

  /**
   * 子要素を纏めて追加する
   * @param items
   * @returns
   */
  addAll(items: I[]) {
    const nodes = items.map((item) => this._add(item));
    this._commit();
    return nodes;
  }

  /**
   * 子要素を追加する
   * @param item
   * @returns
   */
  private _add(item: I) {
    const node = new TreeNode<I>(item, this._options);
    this._children.push(item);
    this._childProxies.push(node.getProxy());
    this._childNodes.push(node);
    return node;
  }

  /**
   * 子要素の取得
   * @returns
   */
  getItems() {
    return this._children;
  }

  /**
   * プロキシされた子要素の取得
   * @returns
   */
  getProxies() {
    return this._childProxies;
  }

  /**
   * 子ノードの取得
   * @returns
   */
  getNodes() {
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
}
