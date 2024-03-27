const localStorageManager = {
  getObject(key: string): any | null {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  },
  setObject(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  },
  clearValue(key: string): void {
    localStorage.removeItem(key);
  },
};

export default localStorageManager;
