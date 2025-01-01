// This file is inteneded to contain data storage related services.
// Use wrapper for every method in such a way that if in future we need to change the storage vendor, changes should happpen in this file only.

const StorageService = (() => {
  let storage: any = null;
  const init = () => {
    if (storage === null) {
      storage = localStorage;
    }
  };

  const get = (storeKey: string, storedValueType?: any) => {
    if (storage === null) {
      return "";
    }
    return storage.getItem(storeKey);
  };

  const set = (storeKey: string, valueToBeStored: any) => {
    if (storage === null) {
      init();
    }
    if (Array.isArray(valueToBeStored)) {
      storage.setItem(storeKey, JSON.stringify(valueToBeStored));
    } else {
      storage.setItem(storeKey, valueToBeStored);
    }
  };

  const deleteStorage = (storeKey: string) => {
    if (storage === null) {
      return;
    }
    storage.removeItem(storeKey);
  };

  const clearAll = () => {
    if (storage === null) {
      return;
    }
    storage.clear();
  };

  return {
    init,
    get,
    set,
    delete: deleteStorage,
    clearAll,
  };
})();

export default StorageService;
