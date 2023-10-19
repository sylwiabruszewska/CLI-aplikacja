import {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} from "./contacts.js";
import { Command } from "commander";
import colors from "colors";

const program = new Command();

program
  .option(
    "-a, --action <type>",
    "choose action: list, get -i, add -n -e -p, remove -i"
  )
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);
const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await listContacts();
      console.log("\nContact list".bgBlue);
      console.table(contacts);
      break;

    case "get":
      const contact = await getContactById(id);
      if (contact) {
        console.log(`\nContact with ID: ${id}`.bgBlue);
        console.table(contact);
        return;
      }
      console.error(`\nThere is no contact with id ${id} `.bgRed);
      break;

    case "add":
      try {
        const newContact = await addContact(name, email, phone);
        console.log("\nContact added!".bgBlue);
        console.table(newContact);
      } catch (error) {
        console.error(error);
      }

      break;

    case "remove":
      try {
        await removeContact(id);
        console.log("\nContact deleted!".bgBlue);
      } catch (error) {
        console.error(error);
      }
      break;

    default:
      console.warn("Unknknown action type!".bgRed);
  }
}

invokeAction(argv);
