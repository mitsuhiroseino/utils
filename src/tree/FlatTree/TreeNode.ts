import NodeBase from './NodeBase';
import { TreeNodeOptions } from './types';

/**
 * ツリーのノード
 */
export default class TreeNode<I extends object> extends NodeBase<I> {
  /**
   * 元の要素
   */
  private _item: I;

  /**
   * プロキシされた要素
   */
  private _proxy: I;

  /**
   * 親ノード
   */
  private _parent: TreeNode<I>;

  /**
   * ネストレベル
   */
  private _level: number;

  constructor(item: I, options: TreeNodeOptions<I> = {}) {
    super();
    const { parent, childrenProp = 'children', isExpandedProp = 'isExpanded', proxyHandlers, ...rest } = options;
    this._options = { ...rest, parent: this };
    // 受け取ったものを保持
    this._item = item;
    const children = item[childrenProp];
    this._children = children;
    this._parent = parent;
    // itemのプロキシを作成
    this._proxy = this._proxyItem(item, proxyHandlers);
    // 子要素もNodeインスタンスを作る
    if (children !== undefined) {
      this._hasChildren = true;
      if (children !== null) {
        this.addAll(children);
      }
    }
    // レベルを設定
    if (parent) {
      this._level = parent.getLevel() + 1;
    } else {
      this._level = 0;
    }
  }

  /**
   * 要素のプロキシを作成する
   * @param item
   * @param handlers
   * @returns
   */
  private _proxyItem(item: I, handlers: any): I {
    return new Proxy(item, {
      get: (target, prop, receiver) => {
        const handler = handlers.get[prop];
        if (handler) {
          // ハンドラーがある場合はハンドラーで処理
          return handler(this, prop);
        }
        // ハンドラーが無い場合は通常の処理
        return Reflect.get(target, prop, receiver);
      },
    });
  }

  getItem() {
    return this._item;
  }

  getProxy() {
    return this._proxy;
  }

  getProxies() {
    return this._childProxies;
  }

  getLevel() {
    return this._level;
  }

  /**
   * 自身のitemと開いている子要素のitemをフラットな配列として取得する
   * @returns
   */
  getFlatProxies() {
    return this._getFlatProxies(this._proxy);
  }

  getParent(): TreeNode<I> {
    return this._parent;
  }

  /**
   * nodeの親であるか
   * @param node
   */
  isParentOf(node: TreeNode<I>) {
    return node.isChildOf(this);
  }

  /**
   * nodeの子であるか
   * @param node
   * @returns
   */
  isChildOf(node: TreeNode<I>) {
    return this._parent === node;
  }

  /**
   * nodeの先祖であるか
   * @param node
   * @returns
   */
  isAncestorOf(node: TreeNode<I>) {
    return node.isDescendantOf(this);
  }

  /**
   * nodeの子孫であるか
   * @param node
   * @returns
   */
  isDescendantOf(node: TreeNode<I>) {
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
   * ルートのノードか
   * @returns
   */
  isRoot() {
    return !this._parent;
  }

  /**
   * 子要素を開く
   */
  expand() {
    this._isExpanded = true;
    this._commit();
  }

  /**
   * 子要素を閉じる
   */
  collapse() {
    this._isExpanded = false;
    this._commit();
  }
}
