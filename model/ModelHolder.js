/**
 * @format
 * @flow
 *
 * @description Manage connection & expose our sqlite database
 */
import SQLite from 'react-native-sqlite-storage';
import ModelConfig from './ModelConfig';
import Model from './Model';

let isDev = process.env.NODE_ENV !== 'production';
let _modelHolder: ModelHolder;
export default class ModelHolder {
  // flowlint unsafe-getters-setters:off
  _config: ModelConfig;
  _sqlite: SQLite.SQLiteDatabase;

  static getInstance() {
    if (_modelHolder && _modelHolder instanceof ModelHolder) {
      return _modelHolder;
    }

    let _config = new ModelConfig({database: '_sekolahku.db', debug: isDev});
    _modelHolder = new ModelHolder(_config);

    return _modelHolder;
  }

  constructor(config: ModelConfig) {
    this.config = config;
  }

  open(): Promise<SQLite.SQLiteDatabase> {
    SQLite.DEBUG(this.config.debug);
    SQLite.enablePromise(this.config.asPromise);
    let databaseInstance: SQLite.SQLiteDatabase;

    return SQLite.openDatabase({
      name: this.config.database,
      location: this.config.location,
    })
      .then((db) => {
        databaseInstance = db;
        console.log('[db] Database open!');

        // Perform any database initialization or updates, if needed
        const model = new Model();
        return model.init(databaseInstance);
      })
      .then(() => {
        this.sqlite = databaseInstance;
        return databaseInstance;
      });
  }

  close(): Promise<void> {
    if (this.sqlite === undefined) {
      return Promise.reject('[db] Database was not open; unable to close.');
    }
    return this.sqlite.close().then((status) => {
      console.log('[db] Database closed.');
      this.sqlite = undefined;
    });
  }

  get config(): ModelConfig {
    return this._config;
  }

  set config(value: ModelConfig) {
    this._config = value;
  }

  get sqlite() {
    if (this._sqlite === undefined) {
      // mock what we use from SQLite.SQLiteDatabase
      return {
        executeSql(statement: string, params?: any[]) {
          throw Error('You forgot to open database first!');
        },
        close() {
          throw Error('Database never open!');
        },
      };
    }

    return this._sqlite;
  }

  set sqlite(value: SQLite.SQLiteDatabase) {
    this._sqlite = value;
  }
}
