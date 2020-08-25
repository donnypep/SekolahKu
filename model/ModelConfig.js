/**
 * @format
 * @flow
 *
 * @description configuration our sqlite database
 */
export default class ModelConfig {
  // flowlint unsafe-getters-setters:off
  _database: string;
  _location: string;
  _debug: boolean;
  _asPromise: boolean;

  constructor(opts: {
    database: string,
    location?: string,
    asPromise?: boolean,
    debug?: boolean,
  }) {
    const {
      database,
      location = 'default',
      asPromise = true,
      debug = false,
    } = opts;

    this.database = database;
    this.location = location;
    this.asPromise = asPromise;
    this.debug = debug;
  }

  get database(): string {
    return this._database;
  }

  set database(value: string) {
    this._database = value;
  }

  get location(): string {
    return this._location;
  }

  set location(value: string) {
    this._location = value;
  }

  get asPromise() {
    return this._asPromise;
  }

  set asPromise(value: boolean) {
    this._asPromise = value;
  }

  get debug() {
    return this._debug;
  }

  set debug(value: boolean) {
    this._debug = value;
  }
}
