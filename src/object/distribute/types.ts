/**
 * 分類するプロパティの情報
 */
export type DistributeConfig = {
  /**
   * @param group 分類先のグループ
   */
  [group: string]: GroupProperties;
};

export type GroupProperties = {
  /**
   * @param property 対象のプロパティ
   * @param value 分類の有無 or 分類先でのプロパティ名
   */
  [property: string | number | symbol]: boolean | string | number | symbol;
};

export type DistributeOptions = {
  /**
   * object自身のプロパティのみを分類対象とする
   */
  ownProperty?: boolean;
};
