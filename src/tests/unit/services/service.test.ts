import * as sinon from 'sinon';
import chai from 'chai';
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/catalog';
import { ICar } from '../../../interfaces/ICar';
import CarModel from '../../../models/carModel';
import CarService from '../../../services/carService';
const { expect } = chai;

const mockCar = {
  model: 'Ferrari Maranello',
  year: 1963,
  color: 'red',
  buyValue: 3500000,
  seatsQty: 2,
  doorsQty: 2,
};

const mockCarWithId: ICar & { _id: string } = {
  _id: '632390e57104dcc1221224d9',
  model: 'Ferrari Maranello',
  year: 1963,
  color: 'red',
  buyValue: 3500000,
  doorsQty: 2,
  seatsQty: 2,
};

const mockListCars = [{
  _id: '6323a030226f962810326f26',
  model: 'Ferrari Maranello',
  year: 1963,
  color: 'red',
  buyValue: 3500000,
  doorsQty: 2,
  seatsQty: 2
}]

describe('Car Service', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);

  beforeEach(async () => {
    sinon.stub(carModel, 'create').resolves(mockCarWithId);
    sinon.stub(carModel, 'read').resolves([mockCarWithId]);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('Creating Car Sucessfully', async () => {
    const created = await carService.create(mockCar);
    expect(created).to.be.deep.equal(mockCarWithId);
  });

  it('Creating Car Failed', async () => {
    let error;
    try {
      await carService.create({} as ICar);
    } catch (err) {
      error = err;
    }
    expect(error).to.be.instanceOf(ZodError);
  });

  it('Car was found', async () => {
    sinon.stub(carModel, 'readOne').resolves(mockCarWithId);
    const founded = await carService.readOne(mockCarWithId._id);
    expect(founded).to.be.deep.equal(mockCarWithId);
  });

  it('If read car failed', async () => {
    sinon.stub(carModel, 'readOne').resolves(null);
    let error;
    try {
      await carService.readOne(mockCarWithId._id);
    } catch (err: any) {
      error = err;
    }
    expect(error, 'error should be defined').not.to.be.undefined;
    expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound)
  });

  it('List of car', async () => {
    const foundedCars = await carService.read();
    expect(foundedCars).to.be.deep.equal([mockCarWithId]);
  });

  it('Delete car', async () => {
    sinon.stub(carModel, 'delete').resolves(mockCarWithId);
    const foundedCars = await carService.delete(mockCarWithId._id);
    expect(foundedCars).to.be.deep.equal(mockCarWithId);
  });

  it('If delete car failed', async () => {
    sinon.stub(carModel, 'delete').resolves(null);
    let error;
    try {
      await carService.delete(mockCarWithId._id);
    } catch (err: any) {
      error = err;
    }
    expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound)
  });
});
