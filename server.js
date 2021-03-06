const express = require("express");
const app = express();
const port = 3001;
const faker = require("faker");
const cors = require("cors");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/my-react-app");

const Schema = mongoose.Schema;

const Product = new Schema(
  {
    name: String,
    breed: String,
    image: String,
    color: String,
    country: String,
    address: String,
    price: String,
    desc: String,
    phone: String,
  },
  { versionKey: false }
);

const ProductModel = mongoose.model("Card", Product);

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// const createData = () => {
//   for(let i = 0; i < 100; i++) {
//     new ProductModel({
//       name: faker.name.firstName(),
//       breed: faker.animal.dog(),
//       color: faker.commerce.color(),
//       image: faker.image.animals(),
//       country: faker.address.country(),
//       address: faker.address.timeZone(),
//       price: faker.commerce.price(),
//       desc: faker.lorem.words(),
//       phone: faker.phone.phoneNumber('+380#########')
//     }).save();
//   }
// }
// createData();

app.get("/products", async (req, res) => {
  try {
      const products = await ProductModel.find().limit(0).skip(0);
      res.status(200).send(products);
  } catch (e) {
      console.log(e);
  }
});

app.get("/product/:id", (req, res) => {
  ProductModel.findOne({ _id: req.params.id }, req.body, (err, product) => {
    res.send(product);
  });
});

app.get("/products/:id/edit", (req, res) => {
  ProductModel.findOne({ _id: req.params.id }, req.body, (err, product) => {
    res.send(product);
  });
});

app.post("/products", (req, res) => {
  let dataPost = req.body;
  const instance = new ProductModel(dataPost);
  instance.save(function (err) {
    console.log(err);
  });
  res.send(instance);
});

app.put("/products/:id", (req, res) => {
  let dataPut = req.body;
  ProductModel.findOneAndUpdate(
    { _id: req.params.id },
    dataPut,
    (error, doc) => {}
  );
  res.send("ok");
});

app.delete("/products/:id", (req, res) => {
  console.log(req.params.id);
  ProductModel.deleteOne({ _id: req.params.id })
    .then(() => {
      res.send("okey");
    })
    .catch((e) => {
      console.log(e);
      res.status(400).send("good");
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
