import express from "express";
import cookieParser from "cookie-parser";
import productRouter from "./routes/products.js";
import session from "express-session";
import cors from "cors";

//Use .env file
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = 5000;

app.use(express.static("public"));
app.use(express.json());

app.use("/products", productRouter);

//Store products in memory
app.use(cookieParser());

app.use(cors());
session({
  secret: `${process.env.COOKIE_SECRET}`,
  resave: false,
  saveUninitialized: true,
});

//Checkout
app.post("/checkout", async (req, res) => {
  //console.log(req.body);
  const items = req.body.items;
  let lineItems = [];
  items.forEach((item) => {
    lineItems.push({
      price: item.id,
      quantity: item.quantity,
    });
    console.log(lineItems);
  });
  //Create a session with the products as line items
  /*
  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: "payment",
    success_url: `${process.env.CLIENT_URL}/success`,
    cancel_url: `${process.env.CLIENT_URL}/cancel`,
  });
  //Send URL back to frontend
  res.send(
    JSON.stringify({
      url: session.url,
    })
  );
  */
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
