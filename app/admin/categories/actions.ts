'use server'
import bcrypt from 'bcryptjs';
import prisma from '../../../lib/prisma'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { FileUpload } from '../common/services';
import { categoryFormType } from './add/categorySchema';
import { Prisma,Category } from '@prisma/client';






export async function addCategory(input: categoryFormType):Promise<Category> {

    const { name, image } = input
    let fileObj: any = image;
    let uploadResponse = '';



    // if (file) {
    //     uploadResponse = await FileUpload(fileObj)
    // }

    // console.log(uploadResponse);


    const data = {
        name: name.toString(),
        image: '',

    }
    let category:Category;
    try {

        category = await prisma.category.create({
            data

        });

    return category;        




    } catch (error) {
        console.error('Error adding category:', error);
        throw error;
    }
}

export async function updateCategory(input: categoryFormType,id:string):Promise<Category> {

    const { name, image } = input
    let fileObj: any = image;
    let uploadResponse = '';


    const data = {
        name: name.toString(),
        image: '',

    }
    let category:Category;
    try {

        category = await prisma.category.update({
            data,
            where:{id:id}

        });

    return category;        




    } catch (error) {
        console.error('Error adding category:', error);
        throw error;
    }
}