const express = require('express');
const faker = require('faker');
const app = express();
const port = 3001;
const cors = require('cors');
const mongoose = require('mongoose');
 
mongoose.connect('mongodb://localhost/my-react-app');

const Schema = mongoose.Schema;

const Product = new Schema({
  name: String,
  breed: String,
  image: String
});

const ProductModel = mongoose.model('Card', Product);

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.get('/products', (req, res) => {
  ProductModel.find({}, function(err, products) {
    res.send(products)
  });
});


app.get('/products/:id', (req, res) => {
  let result = forCards.find((item) => item.id === req.params.id)
  res.send(result)
})


app.post('/products',(req, res) => {
  let dataPost = req.body;
const instance = new ProductModel(dataPost);
instance.save(function (err) {
  console.log(err)
});
res.send('ok')
  });


  app.delete('/products/:id',(req, res) => {
    console.log('wqew')
    ProductModel.deleteOne({_id:  req.params.id}).then(() => {
      res.send('okey')
    })
    .catch((e) => {
      console.log(e)
      res.status(400).send('good')
    })
  });




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})