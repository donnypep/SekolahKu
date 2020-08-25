/**
 *
 * @format
 * @flow
 */

import StudentService from './StudentService';
import StudentRepository from '../repository/StudentRepository';
import ModelHolder from '../model/ModelHolder';

const _StudentRepository = new StudentRepository(ModelHolder.getInstance());
const _StudentService = new StudentService(_StudentRepository);

export default class AppService {
  static get StudentService() {
    return _StudentService;
  }

  static open() {
    return ModelHolder.getInstance().open();
  }
  static close() {
    return ModelHolder.getInstance().close();
  }
}
