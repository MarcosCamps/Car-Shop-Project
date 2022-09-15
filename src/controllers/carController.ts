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
}

export default CarController;
