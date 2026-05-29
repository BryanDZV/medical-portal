declare module "isomorphic-dompurify" {
  interface DOMPurifyStatic {
    sanitize(input: string, options?: Record<string, unknown>): string;
  }

  const DOMPurify: DOMPurifyStatic;
  export default DOMPurify;
}
