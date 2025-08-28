"use client";

import { Contact } from "@/types/contact";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, User, Briefcase, FileText, Clock } from "lucide-react";
import { format } from "date-fns";

interface ContactCardProps {
  contact: Contact;
}

export default function ContactCard({ contact }: ContactCardProps) {
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM dd, yyyy 'at' h:mm a");
    } catch {
      return dateString;
    }
  };

  return (
    <Card className="group h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-l-4 border-l-blue-500">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <CardTitle className="text-xl font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
            {contact.name}
          </CardTitle>
          <Badge variant="secondary" className="ml-2 shrink-0">
            {contact.services.nature}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-gray-700">
            <Phone className="h-4 w-4 text-blue-600 shrink-0" />
            <span className="font-medium">{contact.contact.mobile}</span>
          </div>
          
          <div className="flex items-center gap-3 text-gray-700">
            <Mail className="h-4 w-4 text-blue-600 shrink-0" />
            <span className="text-sm break-all">{contact.contact.email}</span>
          </div>
          
          <div className="flex items-center gap-3 text-gray-700">
            <Briefcase className="h-4 w-4 text-blue-600 shrink-0" />
            <span className="text-sm">{contact.services.workRelated}</span>
          </div>
        </div>

        {contact.note && (
          <div className="pt-3 border-t border-gray-100">
            <div className="flex items-start gap-3 text-gray-700">
              <FileText className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
              <p className="text-sm leading-relaxed">{contact.note}</p>
            </div>
          </div>
        )}

        <div className="pt-3 border-t border-gray-100">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Clock className="h-3 w-3" />
            <span>Submitted {formatDate(contact.submittedAt)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}