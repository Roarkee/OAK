"use client";

import React, { useState } from "react";
import { MessageSquare, X } from "lucide-react";
import { usePathname } from "next/navigation";

export function WhatsAppButton() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) return null;

  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "251911234567";
  const defaultMsg = encodeURIComponent(
    process.env.NEXT_PUBLIC_WHATSAPP_DEFAULT_MSG ||
      "Hello OAKS AFRICA GROUP, I would like to enquire about your engineering and construction services."
  );
  const waUrl = `https://wa.me/${phone}?text=${defaultMsg}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {isOpen && (
        <div className="mb-3 w-72 bg-white rounded-lg shadow-architectural-lg border border-brand-border p-4 transition-all duration-300 animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-center justify-between pb-2 border-b border-brand-border">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-success animate-pulse"></span>
              <span className="text-xs font-semibold text-brand-navy">OAKS Engineering Desk</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-brand-muted hover:text-brand-charcoal"
              aria-label="Close WhatsApp chat popup"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-brand-charcoal mt-2.5 mb-3 leading-relaxed">
            Connect directly with our engineering team on WhatsApp for project consultations and technical enquiries.
          </p>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-2 bg-[#25D366] hover:bg-[#20ba59] text-white py-2 px-3 rounded text-xs font-semibold shadow transition-colors w-full"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Open WhatsApp Chat</span>
          </a>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center space-x-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95 focus:outline-none"
        aria-label="Contact us on WhatsApp"
      >
        <MessageSquare className="w-5 h-5 text-white" />
        <span className="hidden sm:inline text-xs font-semibold tracking-wide">
          Chat With Engineers
        </span>
      </button>
    </div>
  );
}
