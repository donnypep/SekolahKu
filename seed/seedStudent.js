// @flow
import Student from '../domain/Student';
import faker from 'faker';
import getRandomInt from '../util/random';

let gender = ['pria', 'wanita'];
let grade = ['tk', 'sd', 'smp', 'sma'];
let hobbies = ['membaca', 'menulis', 'menggambar'];

export function seedStudent() {
  const student = new Student();
  student.firstName = faker.name.firstName();
  student.lastName = faker.name.lastName();
  student.mobilePhone = faker.phone.phoneNumber(
    faker.definitions.phone_number.formats[0],
  );
  student.gender = gender[getRandomInt(2)];
  student.grade = grade[getRandomInt(4)];
  student.address = faker.address.streetAddress();
  student.hobbies = hobbies;

  return student;
}

export default function generateStudents(max: number = 2) {
  let students = [];
  for (let i = 0; i < max; i = i + 1) {
    students.push(seedStudent());
  }

  return students;
}
