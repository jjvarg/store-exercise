import express from 'express';

const productsRouter = express.Router();

let productsArray = [
    {
        id: "price_1NWKNaB851ugm4QdDSLxaufG",
        title: "Test Product #1",
        price: 10.0,
      },
      {
        id: "price_1NWKOgB851ugm4Qd39OXxmdU",
        title: "Test Product #2",
        price: 1.0,
      },
]

productsRouter.get("/", function (req, res) {
    res.status(200).json(productsArray);
});

productsRouter.get("/:id", function (req, res) {
    let found = productsArray.find(function (product) {
        return product.id === (req.params.id);
    });
    if (found) {
        res.status(200).json(found);
    } else {
        res.sendStatus(404)
    }
})

productsRouter.post('/', function (req, res) {
    //Get productIds from products array
    let productIds = productsArray.map(product => product.id);
    //Get titles from products array
    let titles = productsArray.map(product => product.title);

    // create an object of new Item
    let newProduct = {
        id: req.body.id,
        title: req.body.title,
        price: req.body.price,
    };

    // push new item object to products array of items
    productsArray.push(newProduct);

    // return with status 201 on success
    res.status(201).json(newProduct);
});

productsRouter.put('/:id', function (req, res) {
    let found = productsArray.find(function (product) {
        return product.id === (req.params.id);
    });

    if (found) {
        let updated = {
            id: found.id,
            title: req.body.title,
            price: req.body.price,
        };

        let targetIndex = productsArray.indexOf(found);

        productsArray.splice(targetIndex, 1, updated);

        res.sendStatus(204);
    }else{
        res.sendStatus(404);
    }
});

productsRouter.delete('/:id', function (req, res) {
    let found = productsArray.find(function (product) {
        return product.id === (req.params.id)
    })

    if (found) {
        let targetIndex = productsArray.indexOf(found);

        productsArray.splice(targetIndex, 1);
    }
    res.sendStatus(204);
});

export default productsRouter;