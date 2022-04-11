export interface IPersistenceService {
  create<T>(json: T): Promise<T> | Promise<null>;
}
