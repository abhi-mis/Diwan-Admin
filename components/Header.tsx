"use client";

import { Users, Database } from "lucide-react";

interface HeaderProps {
  totalContacts: number;
}

export default function Header({ totalContacts }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Database className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                TaxUpchar Admin Center
              </h1>
              <p className="text-gray-600 text-sm">
                Manage and view all your contacts
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-lg">
            <Users className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-900">
              {totalContacts} Total Contacts
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}