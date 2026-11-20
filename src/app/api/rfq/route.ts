import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateReference } from "@/lib/utils";
import { z } from "zod";

const rfqSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(6, "Valid phone number required"),
  company: z.string().optional(),
  projectTitle: z.string().min(3, "Project title required"),
  category: z.string().min(1, "Category is required"),
  location: z.string().min(2, "Location is required"),
  scopeOfWork: z.string().min(15, "Scope of work must be at least 15 characters"),
  technicalSpecs: z.string().optional(),
  estimatedBudget: z.string().optional(),
  expectedCommenceDate: z.string().optional().nullable(),
  expectedCompletionDate: z.string().optional().nullable(),
  documents: z.array(z.object({
    fileName: z.string(),
    fileUrl: z.string(),
    fileSize: z.number().optional(),
    fileType: z.string().optional(),
  })).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = rfqSchema.parse(body);

    const referenceNumber = generateReference("OAG-RFQ");

    const rfq = await prisma.quotationRequest.create({
      data: {
        referenceNumber,
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company || null,
        projectTitle: data.projectTitle,
        category: data.category,
        location: data.location,
        scopeOfWork: data.scopeOfWork,
        technicalSpecs: data.technicalSpecs || null,
        estimatedBudget: data.estimatedBudget || null,
        expectedCommenceDate: data.expectedCommenceDate ? new Date(data.expectedCommenceDate) : null,
        expectedCompletionDate: data.expectedCompletionDate ? new Date(data.expectedCompletionDate) : null,
        status: "PENDING",
        documents: data.documents && data.documents.length > 0 ? {
          create: data.documents.map((doc) => ({
            fileName: doc.fileName,
            fileUrl: doc.fileUrl,
            fileSize: doc.fileSize || 0,
            fileType: doc.fileType || "application/pdf",
          })),
        } : undefined,
      },
    });

    // Create audit log
    await prisma.auditLog.create({
      data: {
        adminName: "Public RFQ Portal",
        action: "RFQ_CREATED",
        entityType: "QuotationRequest",
        entityId: rfq.id,
        details: `RFQ submitted by ${data.name} for '${data.projectTitle}' Ref: ${referenceNumber}`,
      },
    });

    return NextResponse.json({
      success: true,
      referenceNumber,
      message: "Quotation request registered successfully. Our commercial estimating team will evaluate your bill of quantities and technical requirements.",
    });
  } catch (error: any) {
    console.error("RFQ API error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred while submitting RFQ." },
      { status: 500 }
    );
  }
}
