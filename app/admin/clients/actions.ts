'use server'
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import prisma from '../../../lib/prisma';
import {Prisma} from '@prisma/client'
import { clientForm } from './add/clientsSchema';




export async function addClient(input: clientForm) {
    const { name,cityId,email,contactNumber,address,clientTypeId} = input
    console.log(email.toString());
    
    const data = {
        name: name.toString(),
        email: email.toString().length > 0?email.toString():null,
        contactNumber:contactNumber.toString(),
        address: address.toString(),
        clientTypeId:clientTypeId,
        cityId:cityId?cityId:''
        
    }
    try {

            const product = await prisma.client.create({
                data

            });


    } catch (error) {
        console.error('Error adding Product:', error);
        throw error;
    }

    revalidatePath(`/admin/clients/list`);
    redirect(`/admin/clients/list`)

}