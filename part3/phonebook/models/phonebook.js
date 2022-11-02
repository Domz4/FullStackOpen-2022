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

const numberValidators = [
  {
    validator: (number) => {
      if ((number[2] === "-" || number[3] === "-") && number.length < 9) {
        return false;
      }
      return true;
    },
    msg: "must be at least 8 digits",
  },
  {
    validator: (number) => {
      return /^\d{2,3}-\d+$/.test(number);
    },
    msg: "invalid phone number",
  },
];
const phonebookSchema = new mongoose.Schema({
  name: { type: String, minlength: 3, required: true },
  number: { type: String, validate: numberValidators, required: true },
});
phonebookSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject._v;
  },
});

module.exports = mongoose.model("Phonebook", phonebookSchema);
