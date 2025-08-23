"use client";

import { useState, useEffect } from "react";

export const useContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("/api/contacts");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Server returned non-JSON response");
        }

        const data = await response.json();

        if (data.success) {
          setContacts(data.data || []);
        } else {
          setError(data.error || "Failed to fetch contacts");
          // Set empty array as fallback
          setContacts([]);
        }
      } catch (err) {
        setError(err.message);
        console.error("Error fetching contacts:", err);
        // Set empty array as fallback
        setContacts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
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
  };
};
