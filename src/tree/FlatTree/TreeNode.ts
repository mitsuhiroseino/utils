import { FLAT_TREE_NODE } from './constans';
import { Node, TreeNodeOptions } from './types';

/**
 * ツリーのノード
 */
export default class TreeNode<I extends object> implements Node<I> {
  private _options: TreeNodeOptions<I>;
  private _item: I;
  private _proxy: I;
  private _parent: TreeNode<I>;
  private _hasChildren = false;
  private _isExpanded = false;
  private _children: I[];
  private _childProxies: I[];
  private _childNodes?: TreeNode<I>[];
  private _level: number;

  constructor(item: I, options: TreeNodeOptions<I> = {}) {
    const {
      parent,
      childrenProp = 'children',
      isExpandedProp = 'isExpanded',
      proxyHandlers = this._createProxyHandlers(childrenProp, isExpandedProp),
      ...rest
    } = options;
    this._options = { ...rest, parent: this, childrenProp, isExpandedProp, proxyHandlers };
    // 受け取ったものを保持
    this._item = item;
    this._children = item[childrenProp];
    this._parent = parent;
    // itemのプロキシを作成
    this._proxy = this._proxyItem(item, proxyHandlers);
    // 子要素もNodeインスタンスを作る
    const children = item[childrenProp];
    if (children !== undefined) {
      this._hasChildren = true;
      if (children !== null) {
        this.addAll(children);
      }
    }
    // レベルを設定
    if (parent) {
      this._level = parent._level + 1;
    } else {
      this._level = 0;
    }
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
        [childrenProp]: (node: TreeNode<I>, prop: string) => node._childProxies,
        // 子要素を開閉フラグを取得
        [isExpandedProp]: (node: TreeNode<I>, prop: string) => node._isExpanded,
      },
    };
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

  /**
   * 子要素を追加する
   * @param item
   * @returns
   */
  add(item: I) {
    const node = new TreeNode<I>(item, this._options);
    this._children.push(item);
    this._childProxies.push(node._proxy);
    this._childNodes.push(node);
    return node;
  }

  /**
   * 子要素を纏めて追加する
   * @param items
   * @returns
   */
  addAll(items: I[]) {
    return items.map((item) => this.add(item));
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

  /**
   * 自身と開いている子要素をフラットな配列として取得する
   * @returns
   */
  getFlatNodes() {
    let nodes: TreeNode<I>[] = [this];
    if (this._hasChildren && this._childNodes && this._isExpanded) {
      this._childNodes.forEach((child) => {
        nodes = nodes.concat(child.getFlatNodes());
      });
    }
    return nodes;
  }

  /**
   * 自身のitemと開いている子要素のitemをフラットな配列として取得する
   * @returns
   */
  getFlatProxies() {
    let items: I[] = [this._item];
    if (this._hasChildren && this._childNodes && this._isExpanded) {
      this._childNodes.forEach((child) => {
        items = items.concat(child.getFlatProxies());
      });
    }
    return items;
  }

  /**
   * 子要素を開く
   */
  expand() {
    this._isExpanded = true;
  }

  /**
   * 子要素を閉じる
   */
  collapse() {
    this._isExpanded = false;
  }
}
