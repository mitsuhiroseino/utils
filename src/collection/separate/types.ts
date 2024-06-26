/**
 * separate関数のオプション
 */
export type SeparateOptions = {
  /**
   * 分類の対象とするネストの深さ。
   * 引数に渡すオブジェクト直下を0として指定する。
   * デフォルトは指定なし
   */
  level?: number;

  /**
   * 分類の対象にオブジェクトを含める
   * 分類された場合は、その配下は処理対象外
   * 分類時にnullを返した場合は、その配下を分類対象として処理する
   */
  includeObject?: boolean;

  /**
   * 分類の対象に配列を含める
   * 分類された場合は、その配下は処理対象外
   * 分類時にnullを返した場合は、その配下を分類対象として処理する
   */
  includeArray?: boolean;
};
