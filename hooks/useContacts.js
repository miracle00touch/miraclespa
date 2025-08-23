"use client";

import { useState, useEffect } from "react";

// Module-scoped cache + dedupe promise so multiple components won't trigger
// parallel requests and can reuse results. This reduces load on serverless
// endpoints (and cold starts) when many clients hydrate at once.
const CACHE_KEY = "miracle_contacts_cache_v1";
let contactsCache = null;
let cacheTs = 0;
let pendingPromise = null;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

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
          // Retry on 5xx
          if (res.status >= 500 && attempt < maxRetries) {
            lastError = new Error(`HTTP ${res.status}`);
            const backoff =
              Math.pow(2, attempt) * 200 + Math.floor(Math.random() * 100);
            await sleep(backoff);
            continue;
          }
          // non-retryable error
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
        // AbortError or network error: retry if attempts left
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

  // Public fetchContacts that uses module cache and deduping promise
  const fetchContacts = async (opts = {}) => {
    // return cached data if still fresh
    try {
      setLoading(true);
      setError(null);

      // check in-memory cache first
      const now = Date.now();
      if (contactsCache && now - cacheTs < CACHE_TTL) {
        setContacts(contactsCache);
        return contactsCache;
      }

      // check sessionStorage as a cold start fallback
      try {
        const raw = sessionStorage.getItem(CACHE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (
            parsed &&
            parsed.ts &&
            parsed.data &&
            now - parsed.ts < CACHE_TTL
          ) {
            contactsCache = parsed.data;
            cacheTs = parsed.ts;
            setContacts(contactsCache);
            return contactsCache;
          }
        }
      } catch (err) {
        // ignore storage errors
      }

      // If a request is already in flight, wait for it (dedupe)
      if (pendingPromise) {
        const result = await pendingPromise;
        setContacts(result);
        return result;
      }

      // Start the network request and store the pending promise
      pendingPromise = (async () => {
        try {
          const data = await fetchWithRetries("/api/contacts", opts);
          if (data && data.success) {
            contactsCache = data.data || [];
            cacheTs = Date.now();
            // persist to sessionStorage for route navigations / reloads
            try {
              sessionStorage.setItem(
                CACHE_KEY,
                JSON.stringify({ ts: cacheTs, data: contactsCache })
              );
            } catch (err) {
              // ignore storage write errors
            }
            return contactsCache;
          }
          // server responded but indicated failure
          throw new Error((data && data.error) || "Failed to fetch contacts");
        } finally {
          // clear pendingPromise so subsequent calls can start a new request when needed
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
      // fire-and-ignore errors on mount (components can call fetchContacts explicitly)
      fetchContacts().catch(() => {});
    }
    // intentionally no dependencies; autoFetch is stable for callers
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Helper function to get contact by type
  const getContactByType = (type) => {
    return contacts.find(
      (contact) => contact.type === type && contact.isActive
    );
  };

  // Helper function to get all contacts of a specific type
  const getContactsByType = (type) => {
    return contacts.filter(
      (contact) => contact.type === type && contact.isActive
    );
  };

  // Helper function to get primary phone number
  const getPrimaryPhone = () => {
    const phoneContact = getContactByType("phone");
    return phoneContact ? phoneContact.value : null;
  };

  // Helper function to get primary email
  const getPrimaryEmail = () => {
    const emailContact = getContactByType("email");
    return emailContact ? emailContact.value : null;
  };

  // Helper function to get WhatsApp number
  const getWhatsAppNumber = () => {
    const whatsappContact = getContactByType("whatsapp");
    return whatsappContact ? whatsappContact.value : null;
  };

  // Helper function to get Viber number
  const getViberNumber = () => {
    const viberContact = getContactByType("viber");
    return viberContact ? viberContact.value : null;
  };

  // Helper function to get Telegram contact
  const getTelegramContact = () => {
    const telegramContact = getContactByType("telegram");
    return telegramContact ? telegramContact.value : null;
  };

  // Helper function to get WeChat contact
  const getWeChatContact = () => {
    const wechatContact = getContactByType("wechat");
    return wechatContact ? wechatContact.value : null;
  };

  // Helper function to get address
  const getAddress = () => {
    const addressContact = getContactByType("address");
    return addressContact ? addressContact.value : null;
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
    // allow consumers to trigger fetch manually when they opted out of autoFetch
    fetchContacts,
  };
};
