declare module 'redirect-ssl' {
  interface RedirectSSLOptions {
    enabled?: boolean;
    statusCode?: number;
    exclude?: string[];
    redirectPort?: number;
    [key: string]: any;
  }

  interface RedirectSSL {
    create(options?: RedirectSSLOptions): (req: any, res: any, next: any) => void;
  }

  const redirectSSL: RedirectSSL;
  export default redirectSSL;
}
