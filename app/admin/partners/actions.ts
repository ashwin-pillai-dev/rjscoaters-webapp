'use server'
import bcrypt from 'bcryptjs';
import prisma from'../../../lib/prisma'
import { type Prisma } from '@prisma/client'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

type addPartnerInputType = {
    name: string;
    roleId: string;
    email: string;
    contactNumber: string;
    password: string;
};


export async function addAgent(input: addPartnerInputType) {

    const adminRole = await prisma.adminRole.findFirst({
        where: { roleName: 'executive' }, // Assuming you have an 'admin' role
      });
    const adminData: Prisma.AdminCreateInput =  {
        name: input.name,
        email: input.email,
        contactNumber:input.contactNumber,
        password: await bcrypt.hash(input.password, 10),
        role: {
          connect: { id: adminRole.id }, // Connect to the found admin role
        },
      }

    // const agentData = {
    //     name: input.name,
    //     email: input.email,
    //     contactNumber:input.contactNumber,
    //     password: await bcrypt.hash(input.password, 10),
    //     adminRoleId:input.roleId
        
    // }
    let admin;

    try {

        admin = await prisma.admin.create({
            data: adminData,

        });
        // redirect(`/admin/partners/list`)

    } catch (error) {
        console.error('Error in adding agent:', error);
        throw error;
    }
    revalidatePath(`/admin/partners/list`);
    return admin;
}