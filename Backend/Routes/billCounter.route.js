import { Router } from "express";
import {
    billCounterController
} from "../Controllers/billCounter.controller.js";

const billCounter = Router();

billCounter.get('/count', billCounterController);

export default billCounter;