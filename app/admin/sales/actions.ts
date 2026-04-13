'use server'
import { revalidatePath } from 'next/cache';
import prisma from '../../../lib/prisma';
import { Admin, Invoice, Product, Sale, type Prisma } from '@prisma/client';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { addedItemSchema, saleSchema } from './add/SalesSchema';
import { Noto_Traditional_Nushu } from 'next/font/google';



export type ProductWithPrices = {
    productId: string
    price: number
    qty: number
    total: number
    product: Product

}

type addedItems = z.infer<typeof addedItemSchema>;
type SalesParam = z.infer<typeof saleSchema>;


export async function addSales(input: SalesParam) {
    let subTotal: number = 0;
    let total: number = 0;

    let qty: number = 0;
    let invoiceItems: any = [];
    let payment: Prisma.PaymentCreateWithoutInvoiceInput;
    if (input.paidAmount > 0) {
        payment = {
            amount: input.paidAmount,
            paymentDate: new Date(input.date)
        }
    }

    input.addedItems.forEach((obj) => {
        // Accumulate subTotal
        subTotal += obj.total;

        // Accumulate total with GST
        let itemTotal = obj.total + (obj.product.gst / 100) * obj.total;
        console.log('product : ', obj.product);
        console.log(itemTotal = obj.total + (obj.product.gst / 100) * obj.total);

        debugger

        // Apply rounding to itemTotal
        itemTotal = Number(itemTotal.toFixed(2));
        console.log('item total: ', itemTotal);

        // Update total after rounding
        total += itemTotal ;
        console.log('item total: ', itemTotal);


        // Accumulate quantity
        qty += obj.qty;

        // Push formatted invoice item
        invoiceItems.push({
            amount: obj.price,
            total:itemTotal ,
            quantity: obj.qty,
            productId: obj.productId.toString(),
        });

        console.log('invoiceItems : ',invoiceItems);
        
    });

    // Apply rounding to subTotal and total after the loop
    subTotal = subTotal % 1 > 0.5 ? Math.ceil(subTotal) : Math.floor(subTotal);
    total = total % 1 > 0.5 ? Math.ceil(total) : Math.floor(total);

    const createInputSales:Prisma.SaleCreateInput = {
        date: new Date(input.date),
        admin:{
            connect:{
                id: input.partnerId
            }
        },
        visitType: input.visitType,
        remarks: input.remarks,
        invoice: {
            create: {
                invoiceNumber: '',
                invoiceItem: {
                    create: invoiceItems
                },
                Payment: {
                    create: payment
                },
                quantity: qty,
                paidAmount: input.paidAmount,
                remainingAmount: input.remainingAmount,
                subTotal: subTotal,
                total: total,
                invoiceDate: new Date(input.date),
                isPaid: false,
                clientId: input.clientId,
            },
        },
    };

    console.log(createInputSales);
    


    let newSale;
    try {

        // Assuming the partner model is included in the input

        newSale = await prisma.sale.create({
            include: {
                admin: true,
                invoice: {
                    include: {
                        client: true,
                        invoiceItem: {
                            include: {
                                product: true
                            }
                        },
                    }
                }
            },
            data:createInputSales,
        });



    } catch (error: any) {
        console.error('Error adding inventory:', error);
        throw error;
    }

    revalidatePath(`/admin/sales/list`);

    return {};
}


export async function updateInvoiceAndInventory(invoice: Prisma.InvoiceGetPayload<{ include: { client: true } }>, InvoiceItems: any) {

    let invoiceItemsUpdate: Prisma.InvoiceItemUpdateInput[] = []
    InvoiceItems.forEach((element) => {
        if (element.isUpdated) {
            invoiceItemsUpdate.push({ id: element.id, quantity: element.updatedQty })
        }
    });

    console.log('invoiceItemsUpdate: ', invoiceItemsUpdate);
    const updatePromises = invoiceItemsUpdate.map(item =>
        prisma.invoiceItem.update({
            where: { id: item.id.toString() },
            data: { quantity: item.quantity },
        })
    );
    // Execute all update operations in parallel
    try {
        const updatedItems = await Promise.all(updatePromises);

    } catch (error) {
    }

    try {
        await updateInventory(InvoiceItems, invoice);
    } catch (error) {
        throw error
    }
    let updatedInvoice: Prisma.InvoiceGetPayload<{
        include: {
            client: true;
            sale: true;
        };
    }>;

    try {
        const invoiceNumber = await generateInvoiceNumber()

        updatedInvoice = await prisma.invoice.update({
            where: { id: invoice.id },
            data: {
                invoiceNumber: invoiceNumber,
                invoiceIsuuesd: true
            },
            include: {
                client: true,
                sale: true
            }
        })

    } catch (error) {
        throw error

    }

    return updatedInvoice;

}



async function generateInvoiceNumber() {
    const currentYear = new Date().getFullYear();

    // Extract the last two digits of the current year
    const currentYearLastTwoDigits = currentYear % 100;

    // Calculate the next year
    const nextYear = currentYear + 1;
    const nextYearLastTwoDigits = nextYear % 100;

    // Format the years as "YY-YY"
    const formattedYearRange = `${currentYearLastTwoDigits.toString().padStart(2, '0')}-${nextYearLastTwoDigits.toString().padStart(2, '0')}`;

    // Combine the random characters, digits, and timestamp to create the invoice number
    const invoiceTotal = await prisma.invoice.count()
    const invoiceNumber = `SS-${invoiceTotal + 1}-${formattedYearRange}`;

    return invoiceNumber;
}

async function updateInventoryQuantity(inventoryId: string, quantity: number) {
    // Simulate updating the inventory quantity in the database
    await prisma.inventory.update({
        where: {
            id: inventoryId,
        },
        data: {
            qty: quantity
        },
    })
    // console.log(`Updated inventory for inventory id ${inventoryId} to new quantity ${quantity}`);
}

async function getInventoryByProductId(productId: string) {
    // Simulate fetching inventory data from a database
    const inventory = await prisma.inventory.findMany({
        where: {
            productId: productId,
            inventoryType: {
                name: 'product'
            }
        }
    });
    // console.log('inventory: ', inventory);

    return inventory[0];
}

async function updateInventory(updateInvoiceItems, invoice: Prisma.InvoiceGetPayload<{ include: { client: true } }>) {
    // console.log(updateInvoiceItems);

    const invoiceItems = updateInvoiceItems;
    // console.log('invoice items', invoiceItems);


    for (const item of invoiceItems) {
        const productId = item.productId;
        const soldQuantity = item.isUpdated ? item.updatedQty : item.quantity;

        // Fetch current inventory
        const inventory = await getInventoryByProductId(productId);

        if (inventory) {
            // Subtract sold quantity
            const newQuantity = inventory.qty - soldQuantity;

            // Update the inventory
            const inventoryUpdatePayload: Prisma.InventoryUpdateCreateInput = {
                qty: soldQuantity,
                inward:false,
                inventory: {
                    connect: { id: inventory.id }
                },
                invoiceNumber: 'Product sold',
                notes: `${soldQuantity} sold to ${invoice.client.name}`
            }
            const inventoryUpdate = await prisma.inventoryUpdate.create({
                data: inventoryUpdatePayload
            })
            await updateInventoryQuantity(inventory.id, newQuantity);
        } else {
            // console.log(`Inventory for product ID ${productId} not found`);
        }
    }
}
