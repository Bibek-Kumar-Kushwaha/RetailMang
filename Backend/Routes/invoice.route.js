import { Router } from 'express';
import {
    getAllInvoiceController,
    invoiceCreateController,
    invoicePrintController
} from '../Controllers/invoice.controller.js';
import { isAdmin, isAuthorized } from '../Middleware/auth.middleware.js';

const invoiceRouter = Router();

invoiceRouter.post('/create', isAuthorized, isAdmin, invoiceCreateController);
invoiceRouter.get('/get/all', isAuthorized, isAdmin, getAllInvoiceController);
invoiceRouter.get('/print/:id', isAuthorized, isAdmin, invoicePrintController);

export default invoiceRouter;