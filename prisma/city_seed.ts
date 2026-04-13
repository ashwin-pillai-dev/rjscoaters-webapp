import { Prisma } from '@prisma/client';
import prisma from '../lib/prisma';
import * as XLSX from 'xlsx';

// Initialize Prisma Client
// const prisma = new PrismaClient();

async function seedClients() {
    try {
        // Load the Excel file
        const workbook = XLSX.readFile('./prisma/clients.xlsx');
        const sheetName = workbook.SheetNames[0]; // Use the first sheet
        const sheet = workbook.Sheets[sheetName];

        // Convert the sheet data to JSON
        const clients = XLSX.utils.sheet_to_json(sheet);
        // console.log('clients: ', clients);

        const clientsToBeadded: Prisma.ClientCreateManyInput[] = []


        for (const client of clients) {

            const cityName: string = client['CITY']
            console.log('city in excel: ', cityName);
            
            const city = await prisma.city.findFirst(
                {
                    where: {
                        name: {
                            contains: cityName
                        }
                    }
                });
            if (city) {
                if(client['NAME'] && client['CONTACT NUMBER']){
                    const contact:string = String(client['CONTACT NUMBER'])
                    console.log('contact: ',contact);
                    
                    

                    clientsToBeadded.push({
                        name: client['NAME'],
                        contactNumber:contact ,
                        cityId: city.id,
                        clientTypeId: 'b2f8b9b4-816d-4133-b603-367aaae7bc37',
                        address: client['ADDRESS']
                    })
                }

            }
        }

        console.log('clientsToBeadded: ', clientsToBeadded);

        const clientsAdded = await prisma.client.createManyAndReturn({
            data: clientsToBeadded
        })

        console.log('clientsAdded: ', clientsAdded);

    } catch (error) {
        console.error('Error seeding clients:', error);
    } finally {
        await prisma.$disconnect();
    }
}

seedClients();
