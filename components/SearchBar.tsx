"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({ 
  searchTerm, 
  onSearchChange, 
  placeholder = "Search contacts..." 
}: SearchBarProps) {
  return (
    <div className="relative max-w-md">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      <Input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-10 pr-4 py-2 w-full border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  );
}