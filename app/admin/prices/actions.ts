'use server'
import prisma from '../../../lib/prisma'
import { redirect } from 'next/navigation';
import { priceFormType } from './add/[product]/priceSchema';





export async function addPrices(input: priceFormType) {

    const { startingQtyLimit, endingQtyLimit, amount, productId, clientTypeId } = input
    const data = {
        startingQtyLimit:startingQtyLimit,
        endingQtyLimit: endingQtyLimit,
        amount: amount,
        clientTypeId: clientTypeId,
        productId: productId
    }

console.log(data);

try {

    const res = await prisma.prices.create({
        data

    });
    // revalidatePath(`/admin/prices/list/${data.productId}`);
    // revalidatePath('admin/prices/list','page')
   

} catch (error) {
    console.error('Error adding client type:', error);
    throw error;
}

redirect(`/admin/prices/list/${data.productId}`)

}

export async function editPrices(input: priceFormType,priceId:string) {

    const { startingQtyLimit, endingQtyLimit, amount, productId, clientTypeId } = input
    const data = {
        startingQtyLimit:startingQtyLimit,
        endingQtyLimit: endingQtyLimit,
        amount: amount,
        clientTypeId: clientTypeId,
        productId: productId
    }

console.log(data);

try {

    const res = await prisma.prices.update({
        data,
        where:{id:priceId}

    });
    // revalidatePath(`/admin/prices/list/${data.productId}`);
    // revalidatePath('admin/prices/list','page')
   

} catch (error) {
    console.error('Error adding client type:', error);
    throw error;
}

redirect(`/admin/prices/list/${data.productId}`)

}