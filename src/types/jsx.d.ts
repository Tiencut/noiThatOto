// Fallback JSX types for environments where @types/react may not be present or for custom JSX elements.
// Prefer installing `@types/react` / `@types/react-dom` in devDependencies; this file prevents the "JSX.IntrinsicElements" missing error during build.

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}
