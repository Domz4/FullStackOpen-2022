require("dotenv").config();
const mongoose = require("mongoose");
const url = process.env.MONGODB_URI;
console.log("connecting to", url);

mongoose
  .connect(url)
  .then(() => console.log("connceted to MongoDB"))
  .catch((err) => {
    console.log("error connecting to MongoDB", err.message);
  });
const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String,
});
phonebookSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject._v;
  },
});

module.exports = mongoose.model("Phonebook", phonebookSchema);
