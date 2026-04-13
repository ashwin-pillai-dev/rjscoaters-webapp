'use server'
import prisma from'../../../lib/prisma'
import { redirect } from 'next/navigation';
import { clientTypeForm } from './add/clientTypeSchema';
import { ClientType } from '@prisma/client';





export async function addClientType(input: clientTypeForm):Promise<ClientType> {

    const { name } = input
    const data = {
        name: name.toString(),
    }
    console.log(data);
    let clientType:ClientType ;
    
    try {

        clientType = await prisma.clientType.create({
            data

        });
        console.log('clientType');
        console.log(clientType);
        
       return clientType;
        // redirect(`/admin/client-type/list`)
    // redirect(`/admin/client-type/list`)


    } catch (error) {
        console.error('Error adding client type:', error);
        throw error;
    }

    console.log('executing revaliate');

    // revalidatePath(`/admin/client-type/list`);
    // redirect(`/admin/client-type/list`)
    


}