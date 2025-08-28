"use client";

import { Contact } from "@/types/contact";
import ContactCard from "./ContactCard";

interface ContactsGridProps {
  contacts: Contact[];
}

export default function ContactsGrid({ contacts }: ContactsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
      {contacts.map((contact) => (
        <ContactCard key={contact.id} contact={contact} />
      ))}
    </div>
  );
}