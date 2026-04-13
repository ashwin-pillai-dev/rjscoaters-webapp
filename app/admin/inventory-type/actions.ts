'use server'
import prisma from'../../../lib/prisma'
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { InventoryTypeFormType } from './add/inventoryTypeSchema';
import {InventoryType} from '@prisma/client'





export async function addInventoryType(input: InventoryTypeFormType):Promise<InventoryType> {

    const { name,desc } = input
    const data = {
        name: name.toString(),
        desc:desc.toString()
    }
    console.log(data);
    
    try {

        const inventoryType  = await prisma.inventoryType.create({
            data
        });

        return inventoryType;


    } catch (error) {
        console.error('Error adding inventory type:', error);
        throw error;
    }

    // revalidatePath(`/admin/inventory-type/list`);
    // redirect(`/admin/inventory-type/list`)

}