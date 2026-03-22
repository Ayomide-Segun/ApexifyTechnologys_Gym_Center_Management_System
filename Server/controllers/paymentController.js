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
                }
            ],
            mode: "payment",
            success_url: "http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}",
            cancel_url: "http://localhost:5173/cancel",
        });
        const payment = await Payment.create({
            classroom,
            member,
            subscription,
            paymentMethod: "stripe",
            transactionId: session.id,
            status: "pending",
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
        const payments = await Payment
        .find()
        .populate("member")
        .populate("classroom")
        .populate("subscription");
        res.status(200).json(payments);
    }catch(error){
        res.status(500).json({
            message: "Payment failed to fetch"
        })
    }
}

exports.deletePayment = async(req, res) => {
    const {id} = req.params;
    try{
        const payment = await Payment.findByIdAndDelete(id);
        res.status(200).json({
            message: "payment deleted"
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            message: "Payment deletion failed"
        })
    }
}

exports.updatePayment = async(req, res) => {
    const {id} = req.params;
    try{
        const payment = await Payment.findByIdAndUpdate(
            id,
            req.body,
            {returnDocument: "after"}
        )
        res.status(201).json({
            message: "Payment successfully updated",
            data: payment
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            message: "Failed to update payment"
        })
    }
}

exports.obtainSession = async(req, res) => {
    const {id} = req.params;
    try{
        const session = await stripe.checkout.sessions.retrieve(id);
        res.json({
            product_name: session.line_items?.[0]?.price_data?.product_data.name || 'Subscription',
            amount: session.amount_total,
            status: session.payment_status
        });
    }catch(err) {
        res.status(400).json({ error: err.message });
    }
}