import { IService } from '../interfaces/IService';
import { ICar, ICarSchema } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import { ErrorTypes } from '../errors/catalog';

class CarService implements IService<ICar> {
  private _car:IModel<ICar>;
  constructor(model:IModel<ICar>) {
    this._car = model;
  }

  public async create(obj:unknown):Promise<ICar> {
    const parsed = ICarSchema.safeParse(obj);

    if (!parsed.success) {
      throw parsed.error;
    }
    return this._car.create(parsed.data);
  }

  public async readOne(_id:string):Promise<ICar> {
    const car = await this._car.readOne(_id);
    if (!car) throw new Error(ErrorTypes.EntityNotFound);
    return car;
  }

  public async read():Promise<ICar[]> {
    const data = await this._car.read();
    return data;
  }

  public async delete(id: string):Promise<ICar> {
    const data = await this._car.delete(id);
    if (!data) throw Error();
    return data;
  }

  public async update(id:string, obj: ICar): Promise<ICar> {
    const data = await this._car.update(id, obj);
    if (!data) throw Error();
    return data;
  }
}

export default CarService;