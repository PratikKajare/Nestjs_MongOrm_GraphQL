export class ConfigSearch {
  public static searchConfig(url: string): any {
    return {
      node: url,
      maxRetries: 10,
      requestTimeout: 60000,
      sniffOnStart: true,
      pingTimeout: 60000,
      index: 'categorys',
      auth: {
        username: 'elastic',
        password: 'KfTdC=4qgizEX6r68vuA',
      },
    };
  }
}
