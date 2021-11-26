const express = require('express')
const faker = require('faker')
const app = express()
const port = 3001


const generateDogs = () => {
  const dogs = [];
  for(let i = 0; i < 100; i++) {
    dogs.push({
      id: faker.datatype.uuid(),
      name: faker.name.firstName(),
      breed: faker.animal.dog(),
      color: faker.commerce.color(),  
      image: faker.image.animals(),
      country: faker.address.country(),
      address: faker.address.timeZone(),
      price: faker.commerce.price(),
      desc: faker.lorem.words(),
      phone: faker.phone.phoneNumber('+380#########')
    })
  }
  return {data: dogs}
}

let dataObj = generateDogs();



app.get('/', (req, res) => {
  res.send(dataObj)
})

console.log(dataObj)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})