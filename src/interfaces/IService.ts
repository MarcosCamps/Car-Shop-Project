export interface IService<T> {
  read():Promise<T []>,
  create(obj: T):Promise<T>,
  readOne(_id:string):Promise<T>,
  update(id:string, obg: T):Promise<T>,
  delete(id:string):Promise<T>,
}