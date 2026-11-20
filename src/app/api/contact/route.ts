import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateReference } from "@/lib/utils";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(6, "Valid phone number required"),
  company: z.string().optional(),
  category: z.string().optional(),
  location: z.string().optional(),
  budget: z.string().optional(),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedData = contactSchema.parse(body);

    const referenceNumber = generateReference("OAG-ENQ");

    const enquiry = await prisma.enquiry.create({
      data: {
        referenceNumber,
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        company: validatedData.company || null,
        category: validatedData.category || null,
        location: validatedData.location || null,
        budget: validatedData.budget || null,
        description: validatedData.description,
        status: "NEW",
      },
    });

    // Create initial audit log
    await prisma.auditLog.create({
      data: {
        adminName: "Public Portal",
        action: "ENQUIRY_CREATED",
        entityType: "Enquiry",
        entityId: enquiry.id,
        details: `New enquiry received from ${validatedData.name} (${validatedData.email}) Ref: ${referenceNumber}`,
      },
    });

    return NextResponse.json({
      success: true,
      referenceNumber,
      message: "Enquiry submitted successfully. An engineering advisor will reach out shortly.",
    });
  } catch (error: any) {
    console.error("Contact API error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
