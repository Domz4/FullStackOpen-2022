const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://Domze:${password}@fullstackopen.a1hxkzh.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(url);

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String,
});
const Phonebook = mongoose.model("Phonebook", phonebookSchema);

if (process.argv.length === 3) {
  Phonebook.find({}).then((result) => {
    result.forEach((phonebook) => {
      console.log(phonebook.name, phonebook.number);
    });
    mongoose.connection.close();
  });
}
if (process.argv.length > 3) {
  const name = process.argv[3];
  const number = process.argv[4];

  const phonebook = new Phonebook({
    name: name,
    number: number,
  });

  phonebook.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
}
