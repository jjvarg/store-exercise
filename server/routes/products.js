import express from "express";
import cors from "cors";

const productRouter = express.Router();

productRouter.use(cors());
const middle = express.urlencoded({
  extended: false,
  limit: 10000,
  parameterLimit: 3,
});

let productsArray = [
  {
    id: "1",
    title: "Test Product #1",
    description: "Test Description",
    price: 10.0,
  },
  {
    id: "2",
    title: "Test Product #2",
    description: "Test Description",
    price: 1.0,
  },
];

productRouter.get("/", function (req, res) {
  res.status(200).json(productsArray);
});

productRouter.get("/:id", function (req, res) {
  let found = productsArray.find(function (product) {
    return product.id === req.params.id;
  });
  if (found) {
    res.status(200).json(found);
  } else {
    res.sendStatus(404);
  }
});

productRouter.post(("/", middle), function (req, res) {
  //Get productIds from products array
  let productIds = productsArray.map((product) => product.id);
  //Get titles from products array
  let titles = productsArray.map((product) => product.title);

  // create an object of new Item and convert price from string to number
  let newProduct = {
    id: (productsArray.length + 1).toString(),
    title: req.body.title,
    description: req.body.description,
    price: parseFloat(req.body.price),
  };

  // push new item object to products array of items
  productsArray.push(newProduct);

  // return with status 201 on success
  res.status(201).json(newProduct);
});

productRouter.put("/:id", function (req, res) {
  let found = productsArray.find(function (product) {
    return product.id === req.params.id;
  });

  if (found) {
    let updated = {
      id: found.id,
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
    };

    let targetIndex = productsArray.indexOf(found);

    productsArray.splice(targetIndex, 1, updated);

    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
});

productRouter.delete("/:id", function (req, res) {
  let found = productsArray.find(function (product) {
    return product.id === req.params.id;
  });

  if (found) {
    let targetIndex = productsArray.indexOf(found);

    productsArray.splice(targetIndex, 1);
  }
  res.sendStatus(204);
});

export default productRouter;
