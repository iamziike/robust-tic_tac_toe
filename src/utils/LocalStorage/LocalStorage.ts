class LocalStorage {
  static setItem(key: string, value: unknown) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static getItem<T>(key: string) {
    const value = localStorage.getItem(key);

    if (value) return JSON.parse(value) as T;
    return value as null;
  }
}

export default LocalStorage;
