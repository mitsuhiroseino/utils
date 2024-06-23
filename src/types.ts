/**
 * 任意のオブジェクト
 */
export type AnyObject<V = any> = Record<string, V>;

/**
 * 任意のオプション
 */
export type AnyOptions = AnyObject<any>;

/**
 * mixin定義用のコンストラクター
 */
export type Constructor<I = any> = new (...args: any[]) => I;

/**
 * IDを持つ要素
 */
export type IdentifiableItem = {
  /**
   * ID
   */
  $id: string;
};

/**
 * JSON.stringifyを利用する機能用のオプション
 */
export type JsonStringifyOptions = {
  /**
   * 特定のキー、値の場合に任意の値を出力する場合に指定
   * @param key キー
   * @param value 値
   * @returns 任意の値
   */
  replacer?: (key: string, value: any) => any;

  /**
   * インデントに設定するスペース
   */
  space?: string | number;
};

/**
 * JSON.parseを利用する機能用のオプション
 */
export type JsonParseOptions = {
  /**
   * 特定のキー、値の場合に任意の値を出力する場合に指定
   * @param key
   * @param value
   * @returns
   */
  reviver?: (key: string, value: any) => any;
};

/**
 * 指定のプロパティをオプショナルにするユーティリティ型
 */
export type Optional<T, K extends keyof T> = Partial<Pick<T, K>> & Omit<T, K>;

/**
 * 指定のプロパティを必須にするユーティリティ型
 */
export type Essential<T, K extends keyof T> = Required<Pick<T, K>> & Omit<T, K>;
