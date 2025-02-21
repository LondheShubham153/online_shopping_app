import { sampleProducts } from '../data/sampleProducts.js';

const DB_NAME = 'shopDB';
const STORE_NAME = 'products';
const DB_VERSION = 1;

let db = null;

function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onerror = () => {
            reject(request.error);
        };

        request.onsuccess = () => {
            db = request.result;
            resolve(db);
        };

        request.onupgradeneeded = (event) => {
            const database = event.target.result;
            
            if (!database.objectStoreNames.contains(STORE_NAME)) {
                const store = database.createObjectStore(STORE_NAME, {
                    keyPath: 'id',
                    autoIncrement: true
                });
                store.createIndex('name', 'name', { unique: false });
                store.createIndex('price', 'price', { unique: false });

                // Add sample products
                const productStore = request.transaction.objectStore(STORE_NAME);
                sampleProducts.forEach(product => {
                    productStore.add(product);
                });
            }
        };
    });
}

export const dbService = {
    async init() {
        if (!db) {
            await openDB();
        }
    },

    async getAllProducts() {
        await this.init();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(STORE_NAME, 'readonly');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.getAll();

            request.onsuccess = () => {
                resolve(request.result);
            };

            request.onerror = () => {
                reject(request.error);
            };
        });
    },

    async addProduct(product) {
        await this.init();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(STORE_NAME, 'readwrite');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.add(product);

            request.onsuccess = () => {
                resolve({ id: request.result, ...product });
            };

            request.onerror = () => {
                reject(request.error);
            };
        });
    },

    async updateProduct(id, product) {
        await this.init();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(STORE_NAME, 'readwrite');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.put({ ...product, id: Number(id) });

            request.onsuccess = () => {
                resolve({ id, ...product });
            };

            request.onerror = () => {
                reject(request.error);
            };
        });
    },

    async deleteProduct(id) {
        await this.init();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(STORE_NAME, 'readwrite');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.delete(Number(id));

            request.onsuccess = () => {
                resolve();
            };

            request.onerror = () => {
                reject(request.error);
            };
        });
    }
}; 