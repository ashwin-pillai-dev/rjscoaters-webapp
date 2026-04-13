// pages/[invoiceId].tsx
import { getInvoiceById } from "../services";
import Invoice from './Invoice';

export default async function Page({ params }: { params: { invoiceId: string } }) {
  const invoiceId = params.invoiceId;

  const invoice = await getInvoiceById(invoiceId);



  return <Invoice invoice={invoice}  />;
}
