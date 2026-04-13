import {Admin, Client, Invoice, Sale} from '@prisma/client';

export type SaleWithInvoice = Sale & {
    invoice: Invoice;
    admin:Admin ;
    'invoice.client':Client
  };