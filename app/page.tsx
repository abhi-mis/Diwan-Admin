"use client";

import { useState, useMemo } from "react";
import { useContacts } from "@/hooks/useContacts";
import ContactsGrid from "@/components/ContactsGrid";
import LoadingState from "@/components/LoadingState";
import ErrorState from "@/components/ErrorState";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Contact } from "@/types/contact";

export default function ContactsPage() {
  const { contacts, loading, error, totalContacts, refetch } = useContacts();
  const [searchTerm, setSearchTerm] = useState("");

  // Filter contacts based on search term
  const filteredContacts = useMemo(() => {
    if (!searchTerm) return contacts;
    
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.contact.mobile.includes(searchTerm) ||
      contact.services.nature.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.services.workRelated.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [contacts, searchTerm]);

  // Get unique service types for stats
  const serviceStats = useMemo(() => {
    const serviceCount = contacts.reduce((acc, contact) => {
      const service = contact.services.nature;
      acc[service] = (acc[service] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return Object.entries(serviceCount).map(([service, count]) => ({
      service,
      count
    }));
  }, [contacts]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header totalContacts={0} />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <div className="animate-pulse">
              <div className="h-10 bg-gray-200 rounded-lg w-80 mb-6"></div>
            </div>
          </div>
          <LoadingState />
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header totalContacts={0} />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center min-h-96">
            <ErrorState error={error} onRetry={refetch} />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header totalContacts={totalContacts} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Stats Section */}
        <div className="mb-8 space-y-6">
          <SearchBar 
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            placeholder="Search by name, email, service, or mobile..."
          />
          
          {/* Service Statistics */}
          {serviceStats.length > 0 && (
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-900">
                  Service Distribution
                </h3>
                <div className="flex flex-wrap gap-2">
                  {serviceStats.map(({ service, count }) => (
                    <Badge key={service} variant="outline" className="gap-1">
                      {service}
                      <span className="ml-1 bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded text-xs">
                        {count}
                      </span>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-gray-600">
            {searchTerm ? (
              <>
                Showing <span className="font-semibold">{filteredContacts.length}</span> of{" "}
                <span className="font-semibold">{totalContacts}</span> contacts
                {filteredContacts.length !== totalContacts && (
                  <span className="ml-2 text-blue-600">
                    (filtered by "{searchTerm}")
                  </span>
                )}
              </>
            ) : (
              <>
                Showing all <span className="font-semibold">{totalContacts}</span> contacts
              </>
            )}
          </p>
        </div>

        {/* Contacts Grid */}
        {filteredContacts.length === 0 && searchTerm ? (
          <Card className="text-center py-12">
            <CardContent>
              <div className="text-gray-500">
                <User className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">No contacts found</h3>
                <p className="text-sm">
                  Try adjusting your search terms or clear the search to see all contacts.
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <ContactsGrid contacts={filteredContacts} />
        )}
      </main>
    </div>
  );
}