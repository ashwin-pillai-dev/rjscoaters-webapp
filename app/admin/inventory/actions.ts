'use server'
import prisma from '../../../lib/prisma'
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { FileUpload } from '../common/services';
import { InventoryFormType } from './add/inventorySchema';
import { Inventory } from '@prisma/client';






export async function addInventory(input: InventoryFormType):Promise<Inventory> {

    const { name, qty, inventoryTypeId, productId } = input
    // let fileObj: any = image;
    // let uploadResponse='';
    // if (fileObj) {
    //     uploadResponse = await FileUpload(fileObj)


    // }
    const data = {
        name: name,
        inventoryTypeId: inventoryTypeId,
        productId: productId,
        qty: qty,
        image:null
    }
    console.log(data);

    try {

        const inventory = await prisma.inventory.create({
            data

        });

        return inventory;



    } catch (error) {
        console.error('Error adding inventory:', error);
        throw error;
    }
}