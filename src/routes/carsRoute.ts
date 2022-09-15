import { Router } from 'express';
import CarController from '../controllers/carController';
import CarModel from '../models/carModel';
import CarService from '../services/carService';

const router = Router();

const car = new CarModel();
const carService = new CarService(car);
const carController = new CarController(carService);

router.post('/cars', (req, res) => carController.create(req, res));

export default router;