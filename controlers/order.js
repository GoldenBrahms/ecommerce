const { Order, InviteOrder } = require('../models/order')
const { errorHandler } = require("../helpers/dbErrorHandlers")
const sgMail = require('@sendgrid/mail');
const ApiKey = process.env.KEY_SENDGRID
sgMail.setApiKey(ApiKey);
 
// your create order method with email capabilities
exports.create = (req, res) => {
    console.log('CREATE ORDER: ', req.body);
    req.body.order.user = req.profile;
    console.log(req.profile)
    const order = new Order(req.body.order);
    order.save((error, data) => {
        if (error) {
            return res.status(400).json({
                error: errorHandler(error)
            });
        }
        // User.find({ categories: { $in: categories } }).exec((err, users) => {}
        console.log('ORDER IS JUST SAVED >>> ', order);
        // send email alert to admin
        // order.address
        // order.products.length
        // order.amount
        const emailData = {
            to: 'brahimchraibi42@gmail.com', // admin
            from: 'chraibibrahim61@gmail.com',
            subject: `A new order is received`,
            html: `
            <h1>Hey Admin, Somebody just made a purchase in your ecommerce store</h1>
            <h2>Customer name: ${order.user.name}</h2>
            <h2>Customer address: ${order.address}</h2>
            <h2>User's purchase history: ${order.user.history.length} purchase</h2>
            <h2>User's email: ${order.user.email}</h2>
            <h2>Total products: ${order.products.length}</h2>
            <h2>Transaction ID: ${order.transaction_id}</h2>
            <h2>Order status: ${order.status}</h2>
            <h2>Product details:</h2>
            <hr />
            ${order.products
                .map(p => {
                    return `<div>
                        <h3>Product Name: ${p.name}</h3>
                        <h3>Product Price: ${p.price}</h3>
                        <h3>Product Quantity: ${p.count}</h3>
                </div>`;
                })
                .join('--------------------')}
            <h2>Total order cost: ${order.amount}<h2>
            <p>Login to your dashboard</a> to see the order in detail.</p>
        `
        };
        sgMail
            .send(emailData)
            .then(sent => console.log('SENT >>>', sent))
            .catch(err => console.log('ERR >>>', err));
 
        // email to buyer
        const emailData2 = {
            to: 'brahimchraibi42@gmail.com',
            from: 'chraibibrahim61@gmail.com',
            subject: `Votre commande Lirya.fr`,
            html: `
            <h3>Bonjour</h3>,
            <h1>Hey ${req.profile.name}, Thank you for shopping with us.</h1>
            <h2>Total products: ${order.products.length}</h2>
            <h2>Transaction ID: ${order.transaction_id}</h2>
            <h2>Order status: ${order.status}</h2>
            <h2>Product details:</h2>
            <hr />
            ${order.products
                .map(p => {
                    return `<div>
                        <h3>Product Name: ${p.name}</h3>
                        <h3>Product Price: ${p.price}</h3>
                        <h3>Product Quantity: ${p.count}</h3>
                </div>`;
                })
                .join('--------------------')}
            <h2>Total order cost: ${order.amount}<h2>
            <p>Thank your for shopping with us.</p>
        `
        };
        sgMail
            .send(emailData2)
            .then(sent => console.log('SENT 2 >>>', sent))
            .catch(err => console.log('ERR 2 >>>', err));
 
        res.json(data);
    });
};


exports.createInvite = (req, res) => {
    console.log('CREATE ORDER: ', req.body);
    req.body.order.user = req.profile;
    console.log(req.profile)
    const orderInvite = new InviteOrder(req.body.order);
    orderInvite.save((error, data) => {
        if (error) {
            return res.status(400).json({
                error: errorHandler(error)
            });
        }
        // User.find({ categories: { $in: categories } }).exec((err, users) => {}
        console.log('ORDER IS JUST SAVED >>> ', orderInvite);
        // send email alert to admin
        // order.address
        // order.products.length
        // order.amount
        
 
        res.json(data);
    });
};