const stripe = require('../config/stripe');
const Payment = require('../Models/Payment');
const Subscription = require('../Models/Subscription')

exports.createCheckoutSession = async(req, res) => {
    const { classroom, member, quantity, subscription } = req.body;
    try{
        const subscriptionModel = await Subscription.findById(subscription);
        const amount = subscriptionModel.price;
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

exports.allPayments = async(req, res) => {
    try{
        const payments = await Payment.find();
        res.status(200).json(payments);
    }catch(error){
        res.status(500).json({
            message: "Payment failed to fetch"
        })
    }
}