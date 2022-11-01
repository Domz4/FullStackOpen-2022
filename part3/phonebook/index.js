const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
require("dotenv").config();
const Phonebook = require("./models/phonebook");

app.use(cors());
app.use(express.json());
app.use(express.static("build"));

morgan.token("data", (req, res) =>
  req.method === "POST" ? JSON.stringify(req.body) : ""
);
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :data")
);

app.get("/api/phonebook", (req, res) => {
  Phonebook.find({}).then((phonebook) => {
    res.json(phonebook);
  });
});
app.get("/info", (req, res, next) => {
  Phonebook.find({})
    .then((people) => {
      response.send(
        `<p>Phonebook has info for ${
          people.length
        } people</p><p>${new Date()}</p>`
      );
    })
    .catch((err) => next(err));
});
app.get("/api/phonebook/:id", (req, res) => {
  Phonebook.findById(req.params.id).then((phonebook) => {
    res.json(phonebook);
  });
});

app.delete("/api/phonebook/:id", (req, res) => {
  Phonebook.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).end();
    })
    .catch((err) => next(err));
});

app.post("/api/phonebook", (req, res, next) => {
  const { name, number } = req.body;
  const phonebook = new Phonebook({
    name: name,
    number: number,
  });

  phonebook
    .save()
    .then((savedPhonebook) => {
      res.json(savedPhonebook);
    })
    .catch((err) => next(err));
});

app.put("/api/phonebook/:id", (req, res, next) => {
  const { name, number } = request.body;

  Phonebook.findByIdAndUpdate(
    request.params.id,
    { name, number },
    { new: true, runValidators: true, context: "query" }
  )
    .then((updatedPhonebook) => {
      response.json(updatedPhonebook);
    })
    .catch((err) => next(err));
});

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);


const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server running on port${PORT}`);
});
