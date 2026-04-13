import { get } from "@/utils/queryHelper/queryHelper";

export async function getInvoiceById(invoiceId: string) {
  try {
    console.log('invoice id:', invoiceId);
    
    const response = await fetch(`${process.env.API_URL}/invoice?invoiceId=${invoiceId}`, {cache:'no-cache'});
    if (response.ok) {
      const data = await response.json();
      console.log('Invoice data:');
      console.log(data);
      return data;
    } else {
      console.error('Error fetching invoices:', response.statusText);
    }
  } catch (error) {
    console.error('Error fetching invoices:', error);
  }
}
