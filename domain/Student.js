/**
 *
 * @format
 * @flow
 */
import Domain from './Domain';
import capitalize from '../util/capitalize';

export type Students = Student[];
// flowlint unsafe-getters-setters:off
export default class Student extends Domain {
  _firstName: string;
  _lastName: string;
  _mobilePhone: string;
  _gender: string;
  _grade: string;
  _hobbies: string[];
  _address: string;

  get fullName() {
    let firstName = capitalize(this.firstName);
    let lastName = capitalize(this.lastName);

    return `${firstName} ${lastName}`;
  }

  set fullName(value: string) {
    throw Error(`Cannot set ${value} to property readonly fullName`);
  }

  get firstName() {
    return this._firstName;
  }

  set firstName(value: string) {
    this._firstName = value;
  }

  get lastName() {
    return this._lastName;
  }

  set lastName(value: string) {
    this._lastName = value;
  }

  get mobilePhone() {
    return this._mobilePhone;
  }

  set mobilePhone(value: string) {
    this._mobilePhone = value;
  }

  get gender() {
    return this._gender;
  }

  set gender(value: string) {
    this._gender = value;
  }

  get grade() {
    return this._grade;
  }

  set grade(value: string) {
    this._grade = value;
  }

  get hobbies() {
    return this._hobbies || [];
  }

  set hobbies(value: string[]) {
    this._hobbies = value;
  }

  get address() {
    return this._address;
  }

  set address(value: string) {
    this._address = value;
  }
}
