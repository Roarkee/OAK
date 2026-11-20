import React from "react";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Building2, Save, MapPin, Phone, Mail, Globe, Target, Compass } from "lucide-react";

export const revalidate = 0;

export default async function AdminCompanyPage() {
  const company = await prisma.companyInformation.findUnique({
    where: { id: "singleton" },
  });

  // Server Action: Update Company Info
  async function updateCompany(formData: FormData) {
    "use server";
    const companyName = formData.get("companyName") as string;
    const tagline = formData.get("tagline") as string;
    const overview = formData.get("overview") as string;
    const history = formData.get("history") as string;
    const vision = formData.get("vision") as string;
    const mission = formData.get("mission") as string;
    const address = formData.get("address") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const whatsapp = formData.get("whatsapp") as string;
    const businessHours = formData.get("businessHours") as string;
    const linkedin = formData.get("linkedin") as string;
    const twitter = formData.get("twitter") as string;

    await prisma.companyInformation.upsert({
      where: { id: "singleton" },
      update: {
        companyName,
        tagline,
        overview,
        history,
        vision,
        mission,
        address,
        email,
        phone,
        whatsapp,
        businessHours,
        linkedin,
        twitter,
      },
      create: {
        id: "singleton",
        companyName,
        tagline,
        overview,
        history,
        vision,
        mission,
        address,
        email,
        phone,
        whatsapp,
        businessHours,
        coreValues: [],
      },
    });

    revalidatePath("/admin/company");
    revalidatePath("/about");
    revalidatePath("/");
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="pb-6 border-b border-brand-border">
        <span className="text-xs font-mono uppercase tracking-widest text-brand-gold font-bold">
          CORPORATE IDENTITY
        </span>
        <h1 className="font-heading text-3xl font-bold text-brand-navy">
          Company Profile & Corporate Information
        </h1>
        <p className="text-xs text-brand-muted mt-1">
          Edit official vision, mission, corporate history, office contacts, and social media channels.
        </p>
      </div>

      {/* Main Profile Form */}
      <form action={updateCompany} className="bg-white p-8 rounded-sm border border-brand-border shadow-sm space-y-6 text-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-mono uppercase text-[10px] text-brand-muted mb-1.5 font-bold">
              Legal Corporate Name *
            </label>
            <input
              name="companyName"
              defaultValue={company?.companyName || "OAKS AFRICA GROUP"}
              required
              className="w-full px-3.5 py-2.5 border rounded-sm focus:border-brand-gold font-semibold text-brand-navy text-sm"
            />
          </div>

          <div>
            <label className="block font-mono uppercase text-[10px] text-brand-muted mb-1.5 font-bold">
              Official Tagline *
            </label>
            <input
              name="tagline"
              defaultValue={company?.tagline || "Engineering Solutions. Lasting Impact."}
              required
              className="w-full px-3.5 py-2.5 border rounded-sm focus:border-brand-gold font-semibold text-brand-gold text-sm"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block font-mono uppercase text-[10px] text-brand-muted mb-1.5 font-bold">
              Corporate Overview *
            </label>
            <textarea
              name="overview"
              rows={3}
              defaultValue={company?.overview || ""}
              required
              className="w-full px-3.5 py-2.5 border rounded-sm focus:border-brand-gold leading-relaxed"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block font-mono uppercase text-[10px] text-brand-muted mb-1.5 font-bold">
              Company History & Background *
            </label>
            <textarea
              name="history"
              rows={3}
              defaultValue={company?.history || ""}
              required
              className="w-full px-3.5 py-2.5 border rounded-sm focus:border-brand-gold leading-relaxed"
            />
          </div>

          <div>
            <label className="block font-mono uppercase text-[10px] text-brand-muted mb-1.5 font-bold">
              Corporate Vision Statement *
            </label>
            <textarea
              name="vision"
              rows={3}
              defaultValue={company?.vision || ""}
              required
              className="w-full px-3.5 py-2.5 border rounded-sm focus:border-brand-gold leading-relaxed"
            />
          </div>

          <div>
            <label className="block font-mono uppercase text-[10px] text-brand-muted mb-1.5 font-bold">
              Corporate Mission Statement *
            </label>
            <textarea
              name="mission"
              rows={3}
              defaultValue={company?.mission || ""}
              required
              className="w-full px-3.5 py-2.5 border rounded-sm focus:border-brand-gold leading-relaxed"
            />
          </div>

          <div>
            <label className="block font-mono uppercase text-[10px] text-brand-muted mb-1.5 font-bold">
              Office Address *
            </label>
            <input
              name="address"
              defaultValue={company?.address || "Oaks Tower, 7th Floor, Bole Commercial Corridor, Addis Ababa"}
              required
              className="w-full px-3.5 py-2.5 border rounded-sm focus:border-brand-gold"
            />
          </div>

          <div>
            <label className="block font-mono uppercase text-[10px] text-brand-muted mb-1.5 font-bold">
              Business Hours *
            </label>
            <input
              name="businessHours"
              defaultValue={company?.businessHours || "Monday - Friday: 8:00 AM - 5:30 PM | Saturday: 8:30 AM - 1:00 PM"}
              required
              className="w-full px-3.5 py-2.5 border rounded-sm focus:border-brand-gold"
            />
          </div>

          <div>
            <label className="block font-mono uppercase text-[10px] text-brand-muted mb-1.5 font-bold">
              Inquiry Email *
            </label>
            <input
              name="email"
              type="email"
              defaultValue={company?.email || "info@oaksafricagroup.com"}
              required
              className="w-full px-3.5 py-2.5 border rounded-sm focus:border-brand-gold"
            />
          </div>

          <div>
            <label className="block font-mono uppercase text-[10px] text-brand-muted mb-1.5 font-bold">
              Telephone *
            </label>
            <input
              name="phone"
              defaultValue={company?.phone || "+251 91 123 4567"}
              required
              className="w-full px-3.5 py-2.5 border rounded-sm focus:border-brand-gold"
            />
          </div>

          <div>
            <label className="block font-mono uppercase text-[10px] text-brand-muted mb-1.5 font-bold">
              WhatsApp Direct Number (digits only with country code)
            </label>
            <input
              name="whatsapp"
              defaultValue={company?.whatsapp || "251911234567"}
              className="w-full px-3.5 py-2.5 border rounded-sm focus:border-brand-gold"
            />
          </div>

          <div>
            <label className="block font-mono uppercase text-[10px] text-brand-muted mb-1.5 font-bold">
              LinkedIn Page URL
            </label>
            <input
              name="linkedin"
              defaultValue={company?.linkedin || "https://linkedin.com/company/oaks-africa-group"}
              className="w-full px-3.5 py-2.5 border rounded-sm focus:border-brand-gold"
            />
          </div>
        </div>

        <div className="pt-6 border-t border-brand-border flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center space-x-2 bg-brand-navy hover:bg-brand-slate text-white px-8 py-3 rounded-sm font-semibold uppercase tracking-wider text-xs transition-colors shadow"
          >
            <Save className="w-4 h-4 text-brand-gold" />
            <span>Save Company Information</span>
          </button>
        </div>
      </form>
    </div>
  );
}
