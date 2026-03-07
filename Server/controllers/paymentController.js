const stripe = require('../config/stripe');
const Payment = require('../models/Payment');
const Subscription = require('../models/Subscription')

exports.createCheckoutSession = async(req, res) => {
    const { classroom, member, quantity, subscription } = req.body;
    try{
        const subscription = await Subscription.findById(subscription);
        const amount = subscription.price;
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
            {
                price_data: {
                currency: "usd",
                product_data: {
                    name: "Gym Membership Subscription",
                },
                unit_amount: amount * 100 
                },
                quantity
            },
            ],
            mode: "payment",
            success_url: "http://localhost:3000/success",
            cancel_url: "http://localhost:3000/cancel",
        });
        const payment = await Payment.create({
            classroom,
            member,
            subscription,
            paymentMethod: "stripe",
            transactionId: session.id,
            status: "successful",
            quantity

        });
        res.json({ url: session.url });
    }catch(error) {
        console.log(error);

        res.status(500).json({
            message: "Payment denied"
        });
    }
    
    }