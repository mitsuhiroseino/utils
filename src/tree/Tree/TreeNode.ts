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

  constructor(item: I, options: TreeNodeOptions<I> = {}) {
    super();
    const { parent, childrenProp = 'children', isExpandedProp = 'isExpanded', proxyHandlers, ...rest } = options;
    this._options = { ...rest, parent: this };
    // 受け取ったものを保持
    this._item = item;
    const children = item[childrenProp];
    this._children = children;
    this._parent = parent;
    // レベルを設定
    this._level = parent.getLevel() + 1;
    // itemのプロキシを作成
    this._proxy = this._proxyItem(item, proxyHandlers);
    // 子要素もNodeインスタンスを作る
    if (children !== undefined) {
      this._hasChildren = true;
      if (children !== null) {
        this.setChildren(children);
      }
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

  remove() {
    this._parent.removeChild(this.getProxy());
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

  /**
   * 要素を取得
   * @returns
   */
  getItem() {
    return this._item;
  }

  /**
   * プロキシを取得
   * @returns
   */
  getProxy() {
    return this._proxy;
  }

  /**
   * 自身のitemと開いている子要素のitemをフラットな配列として取得する
   * @returns
   */
  getFlatProxies() {
    return this._getFlatProxies(this._proxy);
  }

  /**
   * ルートのツリーノードか
   * @returns
   */
  isRoot() {
    return this._level === 0;
  }
}
