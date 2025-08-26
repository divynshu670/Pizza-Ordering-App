export type Resource<T> = 
  | { type: 'success'; data: T }
  | { type: 'error'; message: string }
  | { type: 'loading' };
  