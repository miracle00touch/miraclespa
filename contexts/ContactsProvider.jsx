"use client";

import { useEffect, useRef } from "react";
import { useContacts } from "../hooks/useContacts";

export default function ContactsProvider({ children }) {
  const { fetchContacts } = useContacts({ autoFetch: false });
  const hasInitialized = useRef(false);

  useEffect(() => {
    // Only initialize once to avoid duplicate calls
    if (!hasInitialized.current) {
      hasInitialized.current = true;

      // Fetch once on mount to populate the shared cache; ignore errors here
      // to avoid blocking the app shell. Components can call fetchContacts()
      // themselves if they need to handle errors explicitly.
      fetchContacts().catch((err) => {
        console.warn(
          "ContactsProvider: Failed to prefetch contacts:",
          err.message
        );
      });
    }
  }, [fetchContacts]);

  return children;
}
