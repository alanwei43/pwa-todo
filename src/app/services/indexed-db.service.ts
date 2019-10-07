
export class IndexedDbService {
  private dbOpenPromise: Promise<IDBDatabase> = undefined;

  constructor(version: number, dbName: string, onUpdateVersion: Function) {
    this.dbOpenPromise = new Promise((resolve, reject) => {
      const request = window.indexedDB.open(dbName, version);
      request.addEventListener("error", (event: any) => {
        reject(event.target.error);
      });

      request.addEventListener("success", (event: any) => {
        const db = event.target.result;
        resolve(db);
      });
      request.addEventListener("upgradeneeded", (event: any) => {
        if (typeof onUpdateVersion === "function") {
          onUpdateVersion(event.target.result);
        }
      });
    });
  }
  async getDb(): Promise<IDBDatabase> {
    if (this.dbOpenPromise === undefined) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(this.getDb());
        }, 200);
      });
    }
    return this.dbOpenPromise;
  }
  async getStore(storeName: string): Promise<{ db: IDBDatabase, store: IDBObjectStore }> {
    const db = await this.getDb();
    return new Promise((resolve, reject) => {
      const trans = db.transaction(storeName, "readwrite");
      trans.addEventListener("error", e => reject(e));
      const store = trans.objectStore(storeName);
      return resolve({ db, store });
    });
  }
  async query<T>(storeName: string, key: string): Promise<T> {
    const { db, store } = await this.getStore(storeName);
    return new Promise((resolve, reject) => {
      const q = store.get(key);
      q.onsuccess = (event: any) => {
        resolve(event.target.result);
      };
      q.onerror = (error: any) => {
        reject(error);
      };
    });
  }
  async insert<T>(storeName: string, row: T): Promise<T> {
    const { db, store } = await this.getStore(storeName);
    return new Promise((resolve, reject) => {
      store.add(row);
      resolve(row);
    });
  }
  async getAll<T>(storeName: string): Promise<T[]> {
    const { store } = await this.getStore(storeName);
    const cursors = store.openCursor();
    return new Promise((resolve, reject) => {
      const rows = [];
      cursors.addEventListener("success", (event: any) => {
        const cursor = event.target.result;
        if (cursor === null) {
          resolve(rows);
          return;
        }
        rows.push(cursor.value);
        cursor.continue();
      });
      cursors.addEventListener("error", (error: Event) => reject(error));
    });
  }
  async delete(storeName: string, key: any): Promise<void> {
    const { store } = await this.getStore(storeName);
    return new Promise((resolve, reject) => {
      const result = store.delete(key);
      result.addEventListener("success", () => {
        resolve();
      });
      result.addEventListener("error", event => {
        reject(event);
      })
    });
  }
  async clear(storeName: string): Promise<void> {
    const { store } = await this.getStore(storeName);
    return new Promise((resolve, reject) => {
      const result = store.clear();
      result.addEventListener("success", () => {
        resolve();
      });
      result.addEventListener("error", event => {
        reject(event);
      })
    })
  }
}
