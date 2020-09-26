const db = require("../database/models");
const mercadopago = require("mercadopago");
mercadopago.configure({
    access_token: process.env.MP_CREDENTIALS_DEV,
});

const controller = {
    checkout: async (req, res) => {
        //Obtengo los productos y sus datos.
        const id = req.body.id;
        const userEmail = req.session.user.email;
        const databaseProducts = await db.Product.findAll({
            where: { id: id },
        });
        const productQuantity = req.body.quantity;

        //Armo los productos para pasarlos a los items que require mercadopago.
        const products = databaseProducts.map((element, i) => {
            const priceWithDiscount = (Number(element.price) - ((Number(element.price) * element.discount) / 100));
            return {
                id: element.id,
                name: element.name,
                quantity: Number(productQuantity[i]),
                price: priceWithDiscount,
                discount: element.discount,
                priceWithoutDiscount: element.price,
                image: element.image
            }
        });
        //   Creo la orden.
        var f=new Date();
        const date = (f.getDate() + " / " + f.getMonth() + " / " + f.getFullYear() + "  -  " + f.getHours() + ":" + f.getMinutes() + ":" + f.getSeconds());
        const lastItem = await db.Item.findOne({
            limit: 1,
            order: [["id", "DESC"]],
        });
        const itemId = lastItem.id + 1;
        const lastOrderId = await db.Order.findOne({
            limit: 1,
            order: [["id", "DESC"]],
        });
        const orderId = lastOrderId.id + 1;
        // Creo los items por cada producto.
        products.forEach((element,i) => {
            const price = element.price * element.quantity
            db.Item.create({
                products_id: element.id,
                orders_id: orderId,
                price: price,
                quantity: element.quantity,
                name: element.name,
                discount: element.discount,
                priceWithoutDiscount: element.price,
                image: element.image
            });
        });
        db.Order.create({
            items_id: itemId,
            users_id: req.session.user.id,
            number: orderId,
            status:"pending",
            date: date
        });

        const generateMercadoPagoItemFromProduct = (product) => {
            return {
                title: product.name,
                quantity: product.quantity,
                currency_id: "ARS",
                unit_price: product.price,
            }
        };
        const mercadoPagoProducts = products.map(p => generateMercadoPagoItemFromProduct(p)) ;
        console.log(mercadoPagoProducts)
        const mercadoPagoPreferenceStructure = generatePreferenceStructure(
            mercadoPagoProducts,
            userEmail
        );
        const mercadoPagoPreferency = await mercadopago.preferences.create(
            mercadoPagoPreferenceStructure
        );
        return res.redirect(mercadoPagoPreferency.response.init_point);
    },
    successPayment: async (req, res) => {
        const lastOrderId = await db.Order.findOne({
            limit: 1,
            order: [["id", "DESC"]],
        });
        console.log(req.query)
        lastOrderId.status = "success";

        db.Order.update(lastOrderId. dataValues,{
            where: {
                id: lastOrderId.id
            }
        })
        .then(() => res.redirect(`/users/profile/${req.session.user.id}`));

    },
    failedPayment: (req, res) => {
        res.redirect(`/product/cart`);
    },
};
const generatePreferenceStructure = (
    mercadoPagoProducts,
    userEmail,
    orderId
) => {
    return {
        items: mercadoPagoProducts,
        payment_methods: {
            excluded_payment_types: [
                {
                    id: "ticket",
                },
                {
                    id: "atm",
                },
            ],
        },
        external_reference: String(orderId),
        binary_mode: true,
        auto_return: "all",
        back_urls: {
            pending: "http://localhost:3000/process/",
            failure: "http://localhost:3000/pago_rechazado",
            success: "http://localhost:3000/pago_exitoso",
        },
        payer: {
            email: userEmail,
        },
        shipments: {
            cost: 50,
            mode: "not_specified",
        },
    };
};

module.exports = controller;
