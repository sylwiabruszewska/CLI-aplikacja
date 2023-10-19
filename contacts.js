import { promises as fs } from "fs";
import path from "path";
import { nanoid } from "nanoid";
import colors from "colors";

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

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  const contactWithSameName = contacts.find((contact) => contact.name === name);

  if (contactWithSameName) {
    throw new Error(
      `Contact with name ${name} already exists in contacts.`.red
    );
  }

  contacts.push(newContact);
  fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
}

export { listContacts, getContactById, addContact };
