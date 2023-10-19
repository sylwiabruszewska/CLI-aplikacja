import { listContacts } from "./contacts.js";
import { Command } from "commander";

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

async function invokeAction({ action }) {
  switch (action) {
    case "list":
      const contacts = await listContacts();
      console.table(contacts);
      break;

    default:
      console.warn("Unknknown action type!".red);
  }
}

invokeAction(argv);
