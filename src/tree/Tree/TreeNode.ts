import { DEFAULT_PROPS } from './constans';
import NodeBase from './NodeBase';
import { Node, ProxiedItem, ProxyHandlers, TreeNodeOptions } from './types';

/**
 * ツリーのノード
 */
export default class TreeNode<
  I extends object,
  N extends Node<I, N> = any,
  TN extends TreeNode<I, N, TN> = any,
> extends NodeBase<I, N, TN> {
  /**
   * 元の要素
   */
  private _item: I;

  /**
   * プロキシされた要素
   */
  private _proxy: ProxiedItem<I, N, TN>;

  /**
   * 親ノード
   */
  protected _parent: N;

  /**
   * 子要素のプロパティ名
   */
  private _childrenProp: string;

  /**
   * 子要素の展開状態のプロパティ名
   */
  private _isExpandedProp: string;

  constructor(item: I, options: TreeNodeOptions<I, N> = {}) {
    super();
    const { parent, childrenProp = DEFAULT_PROPS.CHILDREN, isExpandedProp, proxyHandlers, ...rest } = options;
    this._options = { ...rest, parent: this.getNode() };
    // 受け取ったものを保持
    this._childrenProp = childrenProp;
    this._isExpandedProp = isExpandedProp;
    this._item = item;
    const children = item[childrenProp];
    this._children = children;
    this._parent = parent;
    this._isExpanded = isExpandedProp ? !!item[isExpandedProp] : false;
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
  private _proxyItem(item: I, handlers: ProxyHandlers<I, N, TN>): ProxiedItem<I, N, TN> {
    return new Proxy(item, {
      get: (target, prop, receiver) => {
        const handler = handlers.get[prop];
        if (handler) {
          // ハンドラーがある場合はハンドラーで処理
          return handler(this.getTreeNode(), prop);
        }
        // ハンドラーが無い場合は通常の処理
        return Reflect.get(target, prop, receiver);
      },
      set: (target, prop, newValue, receiver) => {
        const handler = handlers.set[prop];
        if (handler) {
          // ハンドラーがある場合はハンドラーで処理
          return handler(this.getTreeNode(), prop, newValue);
        }
        // ハンドラーが無い場合は通常の処理
        return Reflect.set(target, prop, newValue, receiver);
      },
    }) as ProxiedItem<I, N, TN>;
  }

  remove(): void {
    this._parent.removeChild(this.getProxy());
  }

  setChildren(items: I[]): TN[] {
    this._item[this._childrenProp] = items;
    return super.setChildren(items);
  }

  /**
   * 子要素を開く
   */
  expand() {
    this.setExpanded(true);
  }

  /**
   * 子要素を閉じる
   */
  collapse() {
    this.setExpanded(false);
  }

  setExpanded(value: boolean) {
    this._isExpanded = value;
    if (this._isExpandedProp) {
      this._item[this._isExpandedProp] = value;
    }
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
   * ツリーノードを取得
   * @returns
   */
  getTreeNode() {
    return this as unknown as TN;
  }

  /**
   * 要素に値を設定する
   * @param prop
   * @param value
   */
  setValue(prop: string | symbol, value: unknown): void {
    this._item[prop] = value;
  }

  /**
   * 要素から値を取得する
   * @param prop
   */
  getValue(prop: string | symbol): unknown {
    return this._item[prop];
  }

  /**
   * ルートのツリーノードか
   * @returns
   */
  isRoot() {
    return this._level === 0;
  }

  getParent(): N {
    return this._parent;
  }

  /**
   * nodeの子であるか
   * @param node
   * @returns
   */
  isChildOf(node: N) {
    return this._parent === node;
  }

  /**
   * nodeの子孫であるか
   * @param node
   * @returns
   */
  isDescendantOf(node: N) {
    const parent = this._parent;
    if (parent === node) {
      return true;
    } else {
      return parent.isDescendantOf(node);
    }
  }
}
