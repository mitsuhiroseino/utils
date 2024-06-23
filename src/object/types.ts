/**
 * 汎用的なレコードのキー
 */
export type GenericRecordKey = string | number | symbol;

/**
 * 汎用的なレコード
 */
export type GenericRecord<V = unknown> = Record<GenericRecordKey, V>;
