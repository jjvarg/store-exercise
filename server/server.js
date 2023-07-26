import express from 'express'
import Stripe from 'stripe'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import cookieSession from 'cookie-session'
import productsRouter from './routes/products.js'

//Use .env file
import dotenv from 'dotenv'
dotenv.config()

const app = express()
const port = 5000

const stripe = new Stripe (process.env.STRIPE_KEY)

app.use(cors())
app.use(express.static('public'))
app.use(express.json())

app.use("/products", productsRouter);
//Add new products and return them
app.post('/products'), function (req, res) {
    product.push(req.body);
    res.setHeader('Content-Type', 'application/json');
    res.send(product)
};

app.get('/products', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(product);
})

//Store products in memory
app.use(cookieParser())
app.use(cookieSession({secret: `${process.env.COOKIE_SECRET}`}))

app.post('/checkout', async (req, res) => {
    console.log(req.body)
    //Format the data from the body to match how stripe receives it
    const items = req.body.items
    let lineItems = []
    items.forEach((item) => {
        lineItems.push(
            {
                price:item.id,
                quantity:item.quantity,
            }
        )
    })
    //Create a session with the products as line items
    const session = await stripe.checkout.sessions.create({
        line_items:lineItems,
        mode: 'payment',
        success_url: `${process.env.CLIENT_URL}/success`,
        cancel_url: `${process.env.CLIENT_URL}/cancel`
    })
    //Send URL back to frontend
    res.send(JSON.stringify({
        url:session.url
    }))
})

app.listen(port, () => {
    console.log(`App is listening on port ${port}`)
})