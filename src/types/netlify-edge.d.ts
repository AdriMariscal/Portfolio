declare module "https://edge.netlify.com" {
  export interface Context {
    next(): Promise<Response>;
  }
}

declare const Netlify: {
  env: {
    get(name: string): string | undefined;
  };
};
