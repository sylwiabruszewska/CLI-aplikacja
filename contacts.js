import { promises as fs } from "fs";
import path from "path";

const contactsPath = path.join(process.cwd(), "db", "contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, { encoding: "utf-8" });
    return JSON.parse(data);
  } catch (error) {
    console.error(error.message);
  }
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find((contact) => contact.id === contactId);

  if (contact) {
    return contact;
  }
  return null;
}

export { listContacts, getContactById };
