import * as sinon from 'sinon';
import CarModel from '../../../models/carModel';
import chai from 'chai';
import { ICar } from '../../../interfaces/ICar';
import { Model } from 'mongoose';
const { expect } = chai;

const mockCar = {
  model: 'Ferrari Maranello',
  year: 1963,
  color: 'red',
  buyValue: 3500000,
  seatsQty: 2,
  doorsQty: 2
}

const mockCarUpdate = {
  model: 'Ferrari Maranello',
  year: 1940,
  color: 'red',
  buyValue: 3500,
  seatsQty: 2,
  doorsQty: 2
}

const mockCarWithId: ICar & { _id: string } = {
    _id: '632390e57104dcc1221224d9',
    model: 'Ferrari Maranello',
    year: 1963,
    color: 'red',
    buyValue: 3500000,
    doorsQty: 2,
    seatsQty: 2,
  }

  const mockListCars = [{
      _id: '6323a030226f962810326f26',
      model: 'Ferrari Maranello',
      year: 1963,
      color: 'red',
      buyValue: 3500000,
      doorsQty: 2,
      seatsQty: 2
    },
    {
      _id: '6323a046226f962810326f28',
      model: 'Fiat',
      year: 1900,
      color: 'black',
      buyValue: 35000,
      doorsQty: 3,
      seatsQty: 3
    },
    {
      _id: '6323a05a226f962810326f2a',
      model: 'Gol',
      year: 1950,
      color: 'blue',
      buyValue: 35000,
      doorsQty: 4,
      seatsQty: 4
    }]

  const invalidId = 'id Inválido';
  const validId = '632390e57104dcc1221224d9'
  const mongoId = 'InvalidMongoId'

describe('Car Model', () => {
  const carModel = new CarModel();

  beforeEach(() => {
    sinon.stub(Model, 'create').resolves(mockCarWithId);
    sinon.stub(Model, 'findOne').resolves(mockCarWithId);
    sinon.stub(Model, 'find').resolves(mockListCars);
    sinon.stub(Model, 'findByIdAndUpdate').resolves(mockCarUpdate);
    sinon.stub(Model, 'findByIdAndDelete').resolves('removed');
  });

  afterEach(()=>{
    sinon.restore();
  });

  it('Creating Car', async () => {
    const newCar = await carModel.create(mockCar);
    expect(newCar).to.be.deep.equal(mockCarWithId);
  });

  it('Car was found', async () => {
      const founded = await carModel.readOne(validId)
      expect(founded).to.be.deep.equal(mockCarWithId)
  });

  it('If _id is not valid', async () => {
    try {
      await carModel.readOne(invalidId);
    } catch (error: any) {
      expect(error.message).to.be.eq(mongoId);
    }
  });

  it('List of car', async () => {
    const carList =  await carModel.read();
    expect(carList).to.be.deep.equal(mockListCars);
  });

  it('Deleting car', async () => {
    const deleted = await carModel.delete(validId);
    expect(deleted).to.be.equal('removed');
  });

  it('Id is not valid', async () => {
    try {
      await carModel.delete(invalidId);
    } catch (error: any) {
      expect(error.message).to.be.equal(mongoId);
    }
  });

  it('Updating car', async () => {
    const updated = await carModel.update(validId, mockCar);
    expect(updated).to.be.equal(mockCarUpdate);
  });
});