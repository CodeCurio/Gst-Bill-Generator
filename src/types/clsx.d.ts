declare module 'clsx' {
  export type ClassValue = string | number | boolean | undefined | null;
  export function clsx(...inputs: ClassValue[]): string;
}