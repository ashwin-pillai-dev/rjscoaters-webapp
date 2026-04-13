'use server'
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'


const prisma = new PrismaClient();



export async function addAgent(input: FormData) {

    const { name, email, password,contactNumber } = Object.fromEntries(input)
    const agentData = {
        name: name.toString(),
        email: email.toString(),
        contactNumber:contactNumber.toString(),
        password: await bcrypt.hash(password, 10),

    }

    try {

        // const admin = await prisma.partner.create({
        //     data: agentData,

        // });
        revalidatePath(`/admin/partners/list`);
        redirect(`/admin/partners/list`)

    } catch (error) {
        console.error('Error in adding agent:', error);
        throw error;
    }

}