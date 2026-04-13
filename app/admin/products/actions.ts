'use server'
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import prisma from '../../../lib/prisma';
import { FileUpload } from '../common/services';
import { type Prisma } from '@prisma/client'
import { ProductFormData } from './productSchema';






export async function addProduct(input:ProductFormData ) : Promise<Prisma.ProductGetPayload<{include:{category:true}}>> {
    const { name, desc, mrp, category,gst } = input
    console.log('category');
    console.log(category);
    
    // let fileObj: any = file;
    const uploadResponse = ''
    // const uploadResponse = await FileUpload(fileObj)

    const data:Prisma.ProductCreateInput = {
        name: name.toString(),
        image: uploadResponse,
        desc:desc.toString(),
        mrp: parseFloat(mrp.toString()),
        category:{
            connect:{id:category.toString()}
        },
        gst:Number(gst.toString())

    }
    console.log("product data");
    console.log(data);
    
    try {

            const product = await prisma.product.create({
                data,
                include:{
                    category:true
                }
            });

            const inventoryType = await prisma.inventoryType.findFirst({where:{name:{
                equals:'product'
            }}});

            const inventoryData:Prisma.InventoryCreateInput = {
                name:product.name,
                qty:0,
                products:{
                    connect:{id:product.id}
                },
                inventoryType:{
                    connect:{
                        id:inventoryType.id
                    }
                }
            }
            await  prisma.inventory.create({data:inventoryData})

            return  product;
    } catch (error) {
        console.error('Error adding Product:', error);
        throw error;
    }
}

export async function updateProduct(input:ProductFormData,productId:string ) : Promise<Prisma.ProductGetPayload<{include:{category:true}}>> {
    const { name, desc, mrp, category,gst } = input
    console.log('category');
    console.log(category);
    
    // let fileObj: any = file;
    const uploadResponse = ''
    // const uploadResponse = await FileUpload(fileObj)

    const data:Prisma.ProductCreateInput = {
        name: name.toString(),
        image: uploadResponse,
        desc:desc.toString(),
        mrp: parseFloat(mrp.toString()),
        category:{
            connect:{id:category.toString()}
        },
        gst:Number(gst.toString())

    }
    console.log("product data");
    console.log(data);
    
    try {

            const product = await prisma.product.update({
                data,
                include:{
                    category:true
                },
                where:{
                    id:productId
                }
            });

            return  product;
    } catch (error) {
        console.error('Error adding Product:', error);
        throw error;
    }
}