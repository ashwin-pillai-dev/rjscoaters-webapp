'use server'
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import prisma from '../../../lib/prisma';
import { type Prisma } from '@prisma/client'
import { ProductFormData } from './productSchema';

// Helper function to get the 'all' category ID
async function getAllCategoryId() {
    const category = await prisma.category.findFirst({
        where: { name: 'all' }
    });
    
    if (!category) {
        throw new Error("Category 'all' not found. Please ensure it exists in your Turso DB.");
    }
    
    return category.id;
}

export async function addProduct(input: ProductFormData): Promise<Prisma.ProductGetPayload<{include:{category:true}}>> {
    const { name, desc, mrp, gst } = input;
    
    // 1. Get the 'all' category ID specifically
    const allCatId = await getAllCategoryId();

    const data: Prisma.ProductCreateInput = {
        name: name.toString(),
        image: '', // Logic for FileUpload goes here
        desc: desc.toString(),
        mrp: parseFloat(mrp.toString()),
        category: {
            connect: { id: allCatId } // Hardcoded to 'all' category ID
        },
        gst: Number(gst.toString())
    }

    try {
        const product = await prisma.product.create({
            data,
            include: { category: true }
        });

        // Find inventory type 'product'
        const inventoryType = await prisma.inventoryType.findFirst({
            where: { name: { equals: 'product' } }
        });

        if (inventoryType) {
            await prisma.inventory.create({
                data: {
                    name: product.name,
                    qty: 0,
                    products: { connect: { id: product.id } },
                    inventoryType: { connect: { id: inventoryType.id } }
                }
            });
        }

        return product;
    } catch (error) {
        console.error('Error adding Product:', error);
        throw error;
    }
}

export async function updateProduct(input: ProductFormData, productId: string): Promise<Prisma.ProductGetPayload<{include:{category:true}}>> {
    const { name, desc, mrp, gst } = input;
    
    // 1. Get the 'all' category ID specifically
    const allCatId = await getAllCategoryId();

    const data: Prisma.ProductUpdateInput = {
        name: name.toString(),
        desc: desc.toString(),
        mrp: parseFloat(mrp.toString()),
        category: {
            connect: { id: allCatId } // Force update to 'all' category
        },
        gst: Number(gst.toString())
    }

    try {
        const product = await prisma.product.update({
            where: { id: productId },
            data,
            include: { category: true }
        });

        return product;
    } catch (error) {
        console.error('Error updating Product:', error);
        throw error;
    }
}