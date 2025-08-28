"use client";

import { useState, useEffect } from "react";
import { Contact, ContactsResponse } from "@/types/contact";

export function useContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalContacts, setTotalContacts] = useState(0);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch("https://diwan-backend.onrender.com/api/v1/contacts");
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: ContactsResponse = await response.json();
      
      if (data.status === "success") {
        setContacts(data.data.contacts);
        setTotalContacts(data.data.pagination.totalContacts);
      } else {
        throw new Error(data.message || "Failed to fetch contacts");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return {
    contacts,
    loading,
    error,
    totalContacts,
    refetch: fetchContacts
  };
}