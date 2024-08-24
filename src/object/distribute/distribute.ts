import cloneDeep from 'lodash/cloneDeep';
import { DistributeConfig, DistributeOptions } from './types';

/**
 * object直下のプロパティをconfigに従って分類する
 * @param object
 * @param config
 * @param options
 */
export default function distribute(
  object: Record<PropertyKey, unknown>,
  config: DistributeConfig,
  options: DistributeOptions = {},
) {
  const { ownProperty, cloneValue } = options;
  const has = ownProperty ? (property) => Object.hasOwn(object, property) : (property) => property in object;
  const get = cloneValue ? (property) => cloneDeep(object[property]) : (property) => object[property];
  const result: { [group: PropertyKey]: { [property: PropertyKey]: unknown } } = {};
  const rest = { ...object };
  const restGroups: PropertyKey[] = [];

  for (const group in config) {
    const groupProperties = (result[group] = {});
    const properties = config[group];
    if (properties == null) {
      restGroups.push(group);
    } else {
      for (const property in properties) {
        if (has(property)) {
          const value = properties[property];
          if (value === true) {
            groupProperties[property] = get(property);
            delete rest[property];
          } else if (value !== false) {
            groupProperties[value] = get(property);
            delete rest[property];
          }
        }
      }
    }
  }
  if (restGroups.length) {
    for (const group of restGroups) {
      result[group] = { ...rest };
    }
  }

  return result;
}
