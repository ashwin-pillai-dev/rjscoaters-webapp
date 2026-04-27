"use server";

import prisma from '../../lib/prisma';

import { z } from "zod";


// Define Zod schema for server-side validation
const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(5, "Message must be at least 5 characters"),
});

export async function submitContactForm(data: z.infer<typeof contactSchema>) {
  try {
    // Validate data safely on the server
    
    const parsedData = contactSchema.parse(data);

// Insert into the database with explicit field mapping
    await prisma.contact.create({
      data: {
        name: parsedData.name,
        email: parsedData.email,
        phone: parsedData.phone ?? null, // Converts undefined to null for Prisma
        subject: parsedData.subject,
        message: parsedData.message,
      },
    });

    return { success: true, message: "Your message has been sent successfully!" };
  } catch (error) {
    console.error("Contact Form Error:", error);
    return { success: false, message: "Failed to send message. Please try again." };
  }
}