export interface Contact {
  id: string;
  name: string;
  contact: {
    mobile: string;
    email: string;
  };
  services: {
    nature: string;
    workRelated: string;
  };
  note: string;
  submittedAt: string;
}

export interface ContactsResponse {
  status: string;
  message: string;
  data: {
    contacts: Contact[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalContacts: number;
      hasNextPage: boolean;
      hasPrevPage: boolean;
    };
  };
}