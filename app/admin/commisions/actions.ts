'use server'
import prisma from '../../../lib/prisma'
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';


export async function updatePaidStatus({ paid, commissionId }: { paid: boolean, commissionId: string }) {

    try {


        // Update the paid status to true
        const updatedCommission = await prisma.commission.update({
            where: {
                id: commissionId,
            },
            data: {
                paid: paid,
            },
        });

        console.log(`commmission updated`);
        console.log(updatedCommission);

        // revalidatePath(`admin/commisions/list/${commissionId}`)
        // redirect(`admin/commisions/list/${commissionId}`);


        return updatedCommission;


    } catch (error) {
        console.error('Error updating commission:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }

}







export async function addPrices(input: FormData) {

    const { startingQtyLimit, endingQtyLimit, amount, productId, clientType } = Object.fromEntries(input)
    const data = {
        startingQtyLimit: parseInt(startingQtyLimit.toString()),
        endingQtyLimit: parseInt(endingQtyLimit.toString()),
        amount: parseFloat(amount.toString()),
        clientTypeId: clientType.toString(),
        productId: productId.toString()
    }

    console.log(data);

    try {

        const res = await prisma.prices.create({
            data

        });
        // revalidatePath(`/admin/prices/list/${data.productId}`);
        // revalidatePath('admin/prices/list','page')
        redirect(`/admin/prices/list/${data.productId}`)

    } catch (error) {
        console.error('Error adding client type:', error);
        throw error;
    }

}