import { DistributeConfig, DistributeOptions } from './types';

/**
 * object直下のプロパティをconfigに従って分類する
 * @param object
 * @param config
 * @param options
 */
export default function distribute(
  object: Record<string | number | symbol, unknown>,
  config: DistributeConfig,
  options: DistributeOptions = {},
) {
  const { ownProperty } = options;
  const has = ownProperty ? (property) => Object.hasOwn(object, property) : (property) => property in object;
  const result: { [group: string | number | symbol]: { [property: string | number | symbol]: unknown } } = {};
  for (const group in config) {
    const groupProperties = (result[group] = {});
    const properties = config[group];
    for (const property in properties) {
      if (has(property)) {
        const value = properties[property];
        if (value === true) {
          groupProperties[property] = object[property];
        } else if (value !== false) {
          groupProperties[value] = object[property];
        }
      }
    }
  }
  return result;
}
