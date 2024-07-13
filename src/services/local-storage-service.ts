import { KeyValuePair } from "../infrastructure/key-value";

class LocalStorageService {

  public Get(key: string): string {
    try {
      let value = localStorage.getItem(key);
      return value ?? "";
    } catch (error) {
      return "";
    }
  }

  public GetNumber(key: string): number {
    try {
      let value = localStorage.getItem(key) ?? "0";
      return parseInt(value);
    } catch (error) {
      return 0;
    }
  }

  public Add(items: KeyValuePair[]): boolean {
    try {
      items.map((item) => {
        localStorage.setItem(item.key, item.value);
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  public Remove(key: string): boolean {
    try {
      localStorage.removeItem(key);

      return true;
    } catch (error) {
      return false;
    }
  }

  public RemoveRange(keys: string[]): boolean {
    try {
      keys.map((key) => {
        localStorage.removeItem(key);
      });

      return true;
    } catch (error) {
      return false;
    }
  }
}

export default LocalStorageService;
