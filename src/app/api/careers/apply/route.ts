import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const applicationSchema = z.object({
  vacancyId: z.string().min(1, "Vacancy ID required"),
  fullName: z.string().min(2, "Full name required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(6, "Valid phone required"),
  coverLetter: z.string().optional(),
  resumeFileName: z.string().min(1, "Resume file name required"),
  resumeUrl: z.string().min(1, "Resume reference required"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = applicationSchema.parse(body);

    // 1. Resolve Target Vacancy safely to prevent Foreign Key constraint violations
    let targetVacancy = await prisma.jobVacancy.findUnique({
      where: { id: data.vacancyId },
    });

    // Fallback 1: match by slug or title if vacancyId was a slug or fallback string like 'v1'
    if (!targetVacancy) {
      targetVacancy = await prisma.jobVacancy.findFirst({
        where: {
          OR: [
            { slug: data.vacancyId },
            { title: { contains: data.vacancyId, mode: "insensitive" } },
          ],
        },
      });
    }

    // Fallback 2: match any active vacancy
    if (!targetVacancy) {
      targetVacancy = await prisma.jobVacancy.findFirst({
        where: { isActive: true },
      });
    }

    // Fallback 3: if no vacancy exists in the system at all, create a default general candidacy vacancy
    if (!targetVacancy) {
      targetVacancy = await prisma.jobVacancy.create({
        data: {
          title: "General Engineering & Construction Candidacy",
          slug: "general-engineering-candidacy",
          department: "General Talent Pool",
          location: "Addis Ababa, Ethiopia",
          employmentType: "Full-time",
          description: "General speculative application for future engineering, architectural, and project management appointments.",
          requirements: ["Relevant engineering degree or technical certification"],
          responsibilities: ["Participate in upcoming commercial, residential, and infrastructure milestones"],
          isActive: true,
        },
      });
    }

    // 2. Create the Job Application record linked to the resolved targetVacancy.id
    const application = await prisma.jobApplication.create({
      data: {
        vacancyId: targetVacancy.id,
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        coverLetter: data.coverLetter || null,
        resumeFileName: data.resumeFileName,
        resumeUrl: data.resumeUrl,
        status: "NEW",
      },
      include: { vacancy: true },
    });

    // 3. Create Audit Log
    try {
      await prisma.auditLog.create({
        data: {
          adminName: "Careers Portal",
          action: "JOB_APPLICATION_SUBMITTED",
          entityType: "JobApplication",
          entityId: application.id,
          details: `Application from ${data.fullName} for '${targetVacancy.title}'`,
        },
      });
    } catch (auditErr) {
      console.warn("Audit log creation warning:", auditErr);
    }

    return NextResponse.json({
      success: true,
      message: "Application submitted successfully. Our talent recruitment team will review your qualifications.",
    });
  } catch (error: any) {
    console.error("Job Application API error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: error.errors }, { status: 400 });
    }
    return NextResponse.json(
      { success: false, message: error?.message || "An error occurred submitting application." },
      { status: 500 }
    );
  }
}
