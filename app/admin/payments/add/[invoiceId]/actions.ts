// actions.ts
'use server';
import { type Prisma } from "@prisma/client";
import prisma from '../../../../../lib/prisma';
import { paymentFormType } from './paymentSchema';

type paymentRes = Prisma.PaymentGetPayload<{
    include:{
        invoice:true
    }
}>
export async function addPayment(input: paymentFormType):Promise<paymentRes> {
    const { amount, paymentDate, invoiceId } = input;

    const data: Prisma.PaymentCreateInput= {
        amount,
        paymentDate,
        invoice: {
            connect: {
                id: invoiceId
            }
        },
    };

    try {

        const paymentRes = await prisma.payment.create({
            data,
            include:{
                invoice:true
            }
        })

        const updatedInvoice = await prisma.invoice.update({
            data:{
                remainingAmount:paymentRes.invoice.remainingAmount - amount,
                paidAmount:paymentRes.invoice.paidAmount + amount
            },
            where:{
                id:invoiceId
            }
        })

        return paymentRes;
    } catch (error) {
        console.error('Error adding inventory update:', error);
        throw error;
    }

}
