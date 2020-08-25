/**
 * @flow-weak
 *
 * AbstractObject
 * @abstract Class
 * @description JavaScript doesn't have abstract class
 * So, this is an approach in JavaScript
 */
export default class AbstractObject {
  /**
   * @overide method
   * @description To remove _ from the field names
   */
  toJSON() {
    let obj = {};
    for (let key of Object.keys(this)) {
      if (key.startsWith('_')) {
        obj[key.substring(1)] = this[key];
      } else {
        obj[key] = this[key];
      }
    }

    return obj;
  }
}
