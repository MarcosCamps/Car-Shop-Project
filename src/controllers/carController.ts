import { Request, Response } from 'express';
import { ICar } from '../interfaces/ICar';
import { IService } from '../interfaces/IService';

class CarController {
  private _carCon: IService<ICar>;
  constructor(service: IService<ICar>) {
    this._carCon = service;
  }

  public async create(req: Request & { body: ICar }, res: Response<ICar>): Promise<void> {
    const createCar = await this._carCon.create(req.body);
    res.status(201).json(createCar);
  }

  public async read(_req: Request, res: Response): Promise<void> {
    const getAllCars = await this._carCon.read();
    res.status(200).json(getAllCars);
  }

  public async readOne(req: Request, res: Response): Promise<void> {
    const car = await this._carCon.readOne(req.params.id);
    res.status(200).json(car);
  }

  public async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const updated = await this._carCon.update(id, req.body);
    res.status(200).json(updated);
  }
}

export default CarController;
