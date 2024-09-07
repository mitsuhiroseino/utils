export type ToDecimalStringOptions = {
  /**
   * 空文字、null、undefinedの場合に返す値
   * デフォルトは空文字
   */
  emptyValue?: string;

  /**
   * 数値に変換できない時に返す値
   * デフォルトは空文字
   */
  nanValue?: string;

  /**
   * 入力可能な最小値
   * デフォルトはNumber.NEGATIVE_INFINITY
   */
  minValue?: number;

  /**
   * 入力可能な最大値
   * デフォルトはNumber.POSITIVE_INFINITY
   */
  maxValue?: number;

  /**
   * 入力可能な小数点以下の桁数
   * デフォルトは制限なし
   */
  precision?: number;

  /**
   * 入力中の数値に対する処理
   * trueの場合は、'-'、'.'のみや'1.'などの入力中の状態が許容される
   * デフォルトはfalse
   */
  interactive?: boolean;
};
