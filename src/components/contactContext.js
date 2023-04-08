import { createContext } from "react";

export const ContactContext = createContext({
  loading: false,
  setLoading: () => {},
  confirmDelete: () => {},
  addContact: () => {},
  updateContact: () => {},
  groups: [],
  failedToFetch: false,
});
