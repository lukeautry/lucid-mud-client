import Datastore from "nedb";
import { getStorageDirectory } from "../utils/directory";

export interface IFindOptions<T> {
  sort?: {
    key: keyof T;
    direction: "asc" | "desc";
  };
  limit?: number;
  skip?: number;
}

export type StoredModel<T> = T & { _id: string; };

const datastoreCache: { [className: string]: Datastore | undefined } = {};

export abstract class BaseRepository<T> {
  private readonly datastore: Datastore;

  protected constructor(private readonly objectName: string) {
    let datastore = datastoreCache[this.objectName];
    if (!datastore) {
      datastore = new Datastore({
        autoload: true,
        filename: `${getStorageDirectory()}/${this.objectName.toLowerCase().replace("repository", "")}.db`,
      });
    }

    this.datastore = datastoreCache[objectName] = datastore;
  }

  public async create(data: T) {
    return new Promise<StoredModel<T>>((resolve, reject) => {
      this.datastore.insert<T>(data, (err, doc) => {
        if (err) { return reject(err); }
        resolve(doc as StoredModel<T>);
      });
    });
  }

  public async find(data: Partial<StoredModel<T>>, options?: IFindOptions<T>) {
    return new Promise<Array<StoredModel<T>>>((resolve, reject) => {
      let cursor = this.datastore.find<StoredModel<T>>(data);
      if (options) {
        if (options.sort) {
          const sortParams: any = {};
          sortParams[options.sort.key] = options.sort.direction === "asc" ? 1 : -1;
          cursor = cursor.sort(sortParams);
        }

        if (options.skip) {
          cursor = cursor.skip(options.skip);
        }

        if (options.limit) {
          cursor = cursor.limit(options.limit);
        }
      }

      cursor.exec((err, doc) => {
        if (err) { return reject(err); }
        resolve(doc);
      });
    });
  }

  public async findOne(data: Partial<StoredModel<T>>) {
    return new Promise<StoredModel<T> | undefined>((resolve, reject) => {
      this.datastore.findOne(data, (err: Error, doc: StoredModel<T>) => {
        if (err) { return reject(err); }
        resolve(doc ? doc : undefined);
      });
    });
  }

  public async update(query: Partial<StoredModel<T>>, data: T) {
    return new Promise<number>((resolve, reject) => {
      this.datastore.update(query, data, {}, (err: Error, numReplaced) => {
        if (err) { return reject(err); }
        resolve(numReplaced);
      });
    });
  }

  public async count(query: Partial<T>) {
    return new Promise<number>((resolve, reject) => {
      this.datastore.count(query, (err: Error, count: number) => {
        if (err) { return reject(err); }
        resolve(count);
      });
    });
  }

  public async delete(query: Partial<StoredModel<T>>) {
    return new Promise<number>((resolve, reject) => {
      this.datastore.remove(query, (err: Error, numDeleted) => {
        if (err) { return reject(err); }
        resolve(numDeleted);
      });
    });
  }
}
