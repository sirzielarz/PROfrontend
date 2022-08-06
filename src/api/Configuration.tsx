const LOCAL_STORAGE_TOKEN_KEY = "token";

export class Configuration {
  private static instance: Configuration;
  private token: string | null;

  private constructor() {
    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
    if (token) {
      this.token = token;
    } else {
      this.token = null;
    }
  }

  public static getInstance(): Configuration {
    if (!Configuration.instance) {
      Configuration.instance = new Configuration();
    }

    return Configuration.instance;
  }

  public setToken(token: string): void {
    this.token = token;
    localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return this.token;
  }

  public removeToken(): void {
    this.token = null;
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
  }
}
