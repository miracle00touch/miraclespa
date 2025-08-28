"use client";

import { useState, useEffect } from "react";

// Keep a module-scoped pendingPromise to dedupe concurrent fetches,
// but do not store results in memory or sessionStorage so admin updates
// are reflected immediately.
let pendingPromise = null;

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

export const useContacts = (options = { autoFetch: true }) => {
  const { autoFetch = true } = options || {};
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Internal low-level fetch with timeout and retries
  const fetchWithRetries = async (
    url,
    { timeout = 5000, maxRetries = 2 } = {}
  ) => {
    let lastError = null;
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), timeout);
      try {
        const res = await fetch(url, { signal: controller.signal });
        clearTimeout(timer);

        if (!res.ok) {
          if (res.status >= 500 && attempt < maxRetries) {
            lastError = new Error(`HTTP ${res.status}`);
            const backoff =
              Math.pow(2, attempt) * 200 + Math.floor(Math.random() * 100);
            await sleep(backoff);
            continue;
          }
          const text = await res.text().catch(() => "");
          throw new Error(`HTTP ${res.status} ${text}`);
        }

        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Server returned non-JSON response");
        }

        const data = await res.json();
        return data;
      } catch (err) {
        clearTimeout(timer);
        lastError = err;
        if (attempt < maxRetries) {
          const backoff =
            Math.pow(2, attempt) * 200 + Math.floor(Math.random() * 100);
          await sleep(backoff);
          continue;
        }
        throw lastError;
      }
    }
    throw lastError;
  };

  // Public fetchContacts that always queries the server (deduped)
  const fetchContacts = async (opts = {}) => {
    try {
      setLoading(true);
      setError(null);

      if (pendingPromise) {
        const result = await pendingPromise;
        setContacts(result);
        return result;
      }

      pendingPromise = (async () => {
        try {
          const data = await fetchWithRetries("/api/contacts", opts);
          if (data && data.success) {
            return data.data || [];
          }
          throw new Error((data && data.error) || "Failed to fetch contacts");
        } finally {
          pendingPromise = null;
        }
      })();

      const final = await pendingPromise;
      setContacts(final);
      return final;
    } catch (err) {
      setError(err && err.message ? err.message : String(err));
      console.error("Error fetching contacts:", err);
      setContacts([]);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Auto-fetch on mount unless explicitly disabled
  useEffect(() => {
    if (autoFetch) {
      fetchContacts().catch(() => {});
    }

    // Listen for contact updates from admin dashboard
    const handleContactsUpdated = () => {
      // Clear pending promise and refetch
      pendingPromise = null;
      fetchContacts().catch(() => {});
    };

    if (typeof window !== "undefined") {
      window.addEventListener("contactsUpdated", handleContactsUpdated);

      return () => {
        window.removeEventListener("contactsUpdated", handleContactsUpdated);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Helper functions
  const getContactByType = (type) =>
    contacts.find((c) => c.type === type && c.isActive);
  const getContactsByType = (type) =>
    contacts.filter((c) => c.type === type && c.isActive);
  const getPrimaryPhone = () => {
    const phoneContact = getContactByType("phone");
    return phoneContact ? phoneContact.value : null;
  };
  const getPrimaryEmail = () => {
    const emailContact = getContactByType("email");
    return emailContact ? emailContact.value : null;
  };
  const getWhatsAppNumber = () => {
    const whatsappContact = getContactByType("whatsapp");
    return whatsappContact ? whatsappContact.value : null;
  };
  const getViberNumber = () => {
    const viberContact = getContactByType("viber");
    return viberContact ? viberContact.value : null;
  };
  const getTelegramContact = () => {
    const telegramContact = getContactByType("telegram");
    return telegramContact ? telegramContact.value : null;
  };
  const getWeChatContact = () => {
    const wechatContact = getContactByType("wechat");
    return wechatContact ? wechatContact.value : null;
  };
  const getAddress = () => {
    const addressContact = getContactByType("address");
    return addressContact ? addressContact.value : null;
  };

  // Invalidate cache (noop for now, clears pending promise)
  const invalidateCache = () => {
    pendingPromise = null;
    setContacts([]);
    console.log("Contacts cache invalidated (client)");
  };

  return {
    contacts,
    loading,
    error,
    getContactByType,
    getContactsByType,
    getPrimaryPhone,
    getPrimaryEmail,
    getWhatsAppNumber,
    getViberNumber,
    getTelegramContact,
    getWeChatContact,
    getAddress,
    fetchContacts,
    invalidateCache,
  };
};
