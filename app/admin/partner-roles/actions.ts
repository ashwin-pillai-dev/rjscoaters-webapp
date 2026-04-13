'use server'
import prisma from'../../../lib/prisma'
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';





export async function addPartnerRole(input: FormData) {

    const { name } = Object.fromEntries(input)
    const data = {
        name: name.toString(),
    }    
    try {

        const category = await prisma.partnerRole.create({
            data

        });


    } catch (error) {
        console.error('Error adding partner role:', error);
        throw error;
    }

    revalidatePath(`/admin/partner-roles/list`);
    redirect(`/admin/partner-roles/list`)

}