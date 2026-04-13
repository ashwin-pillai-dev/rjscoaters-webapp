import { getInvoiceById } from "../../services";
import InvoiceUpdateForm from "./generateInvoice";


export default async function Page({ params }: { params: { saleId: string } }) {
    const invoiceId = params.saleId;
  
    const invoice = await getInvoiceById(invoiceId);
    console.log('invoice : ', invoice);
    
  
  
  
    return <InvoiceUpdateForm invoice={invoice} invoiceItems={invoice.invoiceItems}/>;
  }