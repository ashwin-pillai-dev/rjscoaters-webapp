// actions.ts
'use server';
import { InventoryUpdateFormType } from '@/app/admin/inventory-logs/add/[inventory]/inventoryUpdateSchema';
import prisma from '../../../../../lib/prisma';
import {type Prisma} from "@prisma/client"

export async function addOutwardUpdate(input: InventoryUpdateFormType) {
    const {inward, updateDate,qty, inventoryId, notes, invoiceNumber,supplier } = input;

    const data:Prisma.InventoryUpdateCreateInput = {
        updateDate:new Date(updateDate),
        qty: qty,
        inventory:{connect:{id:inventoryId}} ,
        notes: notes,
        inward:inward,
        invoiceNumber: invoiceNumber,
        supplier:supplier
    };

    console.log('inventory update data: ',data)
    try {
     const currentInvetory =   await prisma.inventory.findFirst({
            where:{
                id:inventoryId.toString()
            }     
        });
      const res =   await prisma.inventoryUpdate.create({
            data
        });

        await prisma.inventory.update({
            where:{
                id:inventoryId.toString()
            },
            data:{
                qty:currentInvetory.qty - data.qty
            }
        })
        return res;
    } catch (error) {
        console.error('Error adding inventory update:', error);
        throw error;
    }
}
