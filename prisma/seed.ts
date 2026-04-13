// import { PrismaClient } from "@prisma/client";
import prisma from '../lib/prisma';

import bcrypt from 'bcryptjs';

// const prisma = new PrismaClient();

async function main() {

    //     data: {
//         name: 'Partner Name',
//         email: 'phani.sharma@gmail.com',
//         password: await bcrypt.hash('123456789', 10),
//         contactNumber: '9819421170',
//         partnerRoleId: partnerRole.id,
//     },


    // const admin = await prisma.admin.findUnique({
    //     where: {
    //       email: 'phani.ayurarogyam@gmail.com'
    //     },
    //     include: {
    //       role: true
    //     }
    //   })
    //   console.log('admin: ',admin);

    const cities = await prisma.city.createMany({
        data:[
            {name:'KALYAN (WEST)'},
            {name:'KALYAN (EAST)'},
            {name:'ULHASNAGAR (EAST)'},
            {name:'THAKURLI (EAST)'},
            {name:'DOMBIVLI (EAST)'},
            {name:'DOMBIVLI (WEST)'},

        ]
        
    })

    console.log('cities: ',cities);
    





    // const admin = await prisma.admin.findUnique({
    //     where: {
    //       email: 'phani.ayurarogyam@gmail.com'
    //     },
    //     include: {
    //       role: true
    //     }
    //   })
    //   console.log('admin: ',admin);

    //   const adminUpdate = await prisma.admin.update({
    //     where: {
    //       email: 'phani.ayurarogyam@gmail.com'
    //     },
    //     data: {
    //         password: await bcrypt.hash('123456789', 10),
          
    //     }
    //   })
    //   console.log('admin: ',adminUpdate);

//   const superAdminRole = await prisma.adminRole.create({
//     data: {
//         roleName: 'executive',
//     },
// });

// Create an admin with the superadmin role
// const superAdmin = await prisma.inventory.updateMany({
//     data: {
//         qty:0
//     },
// });

// Create an admin with the superadmin role
// const superAdmin = await prisma.admin.create({
//     data: {
//         name: 'Anil Pillai',
//         email: 'anilpillai.vibrant@gmail.com',
//         password: await bcrypt.hash('123456789', 10),
//         contactNumber: '8087979983',
//         adminRoleId: superAdminRole.id,
//     },
// });

// Create a partner role
// const partnerRole = await prisma.partnerRole.create({
//     data: {
//         name: 'teamleader',
//     },
// });

// Create a partner
// const partner = await prisma.partner.create({
//     data: {
//         name: 'Partner Name',
//         email: 'phani.sharma@gmail.com',
//         password: await bcrypt.hash('123456789', 10),
//         contactNumber: '9819421170',
//         partnerRoleId: partnerRole.id,
//     },
// });
  
    // // Create client types
    // const shopkeeper = await prisma.clientType.create({
    //     data: {
    //         name: 'Shopkeeper',
    //     },
    // });

    // const retailer = await prisma.clientType.create({
    //     data: {
    //         name: 'Retailer',
    //     },
    // });

    // // Create categories
    // const healthCategory = await prisma.category.create({
    //     data: {
    //         name: "Health and Wellness",
    //         image: "health_wellness.jpg", // Replace with the actual image path
    //         desc: "Products for health and wellness",
    //     },
    // });

    // const hairCategory = await prisma.category.create({
    //     data: {
    //         name: "Hair Products",
    //         image: "hair_products.jpg", // Replace with the actual image path
    //         desc: "Hair care products",
    //     },
    // });

    // // Create products
    // const ojuset = await prisma.product.create({
    //     data: {
    //         name: "Ojuset Hair Oil",
    //         image: "ojuset.jpg", // Replace with the actual image path
    //         desc: "Premium hair oil for healthy hair",
    //         mrp: 20.00,
    //         categoryId: healthCategory.id,
    //     },
    // });

    // const kurol = await prisma.product.create({
    //     data: {
    //         name: "Kurol Hair Growth Serum",
    //         image: "kurol.jpg", // Replace with the actual image path
    //         desc: "Promotes hair growth and strengthens hair",
    //         mrp: 25.00,
    //         categoryId: healthCategory.id,
    //     },
    // });

    // const hairOil1 = await prisma.product.create({
    //     data: {
    //         name: "SilkyLocks Hair Oil",
    //         image: "hair_oil_a.jpg", // Replace with the actual image path
    //         desc: "SilkyLocks Hair Oil Description",
    //         mrp: 15.00,
    //         categoryId: hairCategory.id,
    //     },
    // });

    // const hairOil2 = await prisma.product.create({
    //     data: {
    //         name: "ShineElixir Hair Oil",
    //         image: "hair_oil_b.jpg", // Replace with the actual image path
    //         desc: "ShineElixir Hair Oil Description",
    //         mrp: 18.00,
    //         categoryId: hairCategory.id,
    //     },
    // });

    // // Create clients
    // const client1 = await prisma.client.create({
    //     data: {
    //         name: "Beauty Emporium",
    //         email: "beautyemporium@gmail.com",
    //         address: "123 Beauty Street",
    //         contactNumber: "Shopkeeper Contact 1",
    //         clientTypeId: shopkeeper.id,
    //     },
    // });

    // const client2 = await prisma.client.create({
    //     data: {
    //         name: "Glamour Haven",
    //         email: "glamourhaven@gmail.com",
    //         address: "456 Glamour Avenue",
    //         contactNumber: "Retailer Contact 1",
    //         clientTypeId: retailer.id,
    //     },
    // });

    // // Create prices for clients
    // const ojusetPrice1 = await prisma.prices.create({
    //     data: {
    //         startingQtyLimit: 1,
    //         endingQtyLimit: 5,
    //         amount: 9.99,
    //         productId: ojuset.id,
    //         clientTypeId: shopkeeper.id,
    //     },
    // });

    // const ojusetPrice2 = await prisma.prices.create({
    //     data: {
    //         startingQtyLimit: 6,
    //         endingQtyLimit: 10,
    //         amount: 8.99,
    //         productId: ojuset.id,
    //         clientTypeId: shopkeeper.id,
    //     },
    // });

    // const kurolPrice1 = await prisma.prices.create({
    //     data: {
    //         startingQtyLimit: 1,
    //         endingQtyLimit: 5,
    //         amount: 22.99,
    //         productId: kurol.id,
    //         clientTypeId: retailer.id,
    //     },
    // });

    // const kurolPrice2 = await prisma.prices.create({
    //     data: {
    //         startingQtyLimit: 6,
    //         endingQtyLimit: 10,
    //         amount: 20.99,
    //         productId: kurol.id,
    //         clientTypeId: retailer.id,
    //     },
    // });

    // Add more client data and prices as needed

    // console.log("Data created successfully.");
}

main()
    .catch((e) => {
        console.error(e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
