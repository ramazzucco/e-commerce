const db = require('../database/models');
const { check, validationResult, body } = require("express-validator");
const bcrypt = require("bcrypt");
const { Op } = db.Sequelize;


const controllers = {

    register: (req, res) => {
        res.render("register");
    },

    store: (req, res, next) => {
        let errorsValidator = validationResult(req);
        let errors = errorsValidator.errors.filter( error => { return error.value != undefined })

        if (errors.length) {
            return res.render("register", { errors });
        } else {
            req.body.password = bcrypt.hashSync(req.body.password, 10);
            req.body.avatar = req.file ? req.file.filename : "avatardefault.png";
            db.User.findOne({
                where: {
                    email: { [Op.like]: [req.body.email] },
                },
            }).then((user) => {
                if (!user) {
                    db.User.create(req.body).then();
                    res.redirect("/");
                } else {
                    const categorys = db.Category.findAll();
                    errors = [{ param:"email", msg: "El email ya existe" }];
                    return res.render("register", { errors: errors });
                }
            });
        }
    },

    admin: async (req, res) => {
        const admin = req.session.user;
        const categorys = await db.Category.findAll({
            include: [{ association: "products" }],
        });
        const products = await db.Product.findAll({ include: "category" });
        const users = await db.User.findAll();
        const messages = await db.Message.findAll({
            where: {
                users_id: users.map(user => { return user.id })
            }
        });
        const orderSuccess = await db.Order.findAll({
            where: {
                status: "success"
            }
        });
        const profits = await db.Item.sum("price",{
            where: {
                orders_id: orderSuccess.map(order => { return order.id})
            }
        });
        const orderPending = await db.Order.findAll({
            where: {
                status: "pending"
            }
        });
        const pending = await db.Item.sum("price",{
            where: {
                orders_id: orderPending.map(order => { return order.id})
            }
        });
        const promotions = await db.Promotion.findAll();
        const visit_page = req.cookies.visit_page;

        res.render("admin", { products, categorys, users, admin, messages, visit_page, profits, pending, promotions });
    },

    login: (req, res) => {
        res.render("login");
    },

    processLogin: (req, res, next) => {
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors);
            return res.render("login",{ errors: errors.errors });
        } else {
            db.User.findAll({
                where: {
                    email: { [Op.like]: [req.body.email] },
                },
            })
            .then((usuario) => {
                if (usuario[0] != undefined) {
                    if (bcrypt.compareSync(req.body.password, usuario[0].password)) {
                        req.session.user = usuario[0];
                        if (req.body.rememberme) {
                            res.cookie("user", usuario[0], {maxAge: 1000 * 60 * 60 * 24 * 90});
                            req.session.user = req.cookies.user;
                        }
                        if (usuario[0].status == 0 && 1) {
                            res.redirect(`profile/${usuario[0].id}`);
                        } else {
                            res.redirect(`admin/${usuario[0].id}`);
                        }
                    } else {
                        errors = [{ param:"password", msg: "La contraseña no es correcta" }];
                        return res.render("login", { errors: errors });
                    }
                } else {
                    errors = [{ param:"email", msg: "El usuario no es correcto" }];
                    return res.render("login", { errors: errors });
                }
            });
        }
    },

    update: async (req, res) => {
        let errorsValidator = validationResult(req);
        const user = req.session.user;
        let errors = errorsValidator.errors.filter( error => { return error.value != user.avatar });
        const orders = await db.Order.findAll({ where:{ users_id: req.session.user.id }});
        const ordersId = orders.map( order => { return order.id });
        const items = await db.Item.findAll({ where: { orders_id: ordersId }, order: ["products_id"]});
        const productsId = items.map( item => { return item.products_id });
        const products = await db.Product.findAll({ where: { id: productsId }});
        const purchases = [];
        items.forEach( (item,i) => {
            purchases.push({
                    id: item.id,
                    order: item.orders_id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    image: products[i].image,
                    priceWithoutDiscount: products[i].price,
                    discount: products[i].discount
            })
        });
        const users = await db.User.findAll();
        const messages = await db.Message.findAll({ where: { users_id: users.map(user => { return user.id })}});
        const categorys = await db.Category.findAll();

        if (errors.length) {

            res.render('profile', { categorys, purchases, users, messages, errors });

        } else {

            if(req.body.avatar == user.avatar){
                if (bcrypt.compareSync(req.body.password, user.password)){

                    req.body.password = user.password;
                    req.body.status = user.status;
                    req.body.id = user.id;
                    req.session.user = req.body;

                    db.User.update(req.body, {
                        where: { id: user.id }
                    })
                    .then(() =>  res.redirect(`/users/profile/${user.id}`));
                } else {
                    const errors = [{ param: "password",msg: "Contraseña Incorrecta" }];
                    res.render('profile', { categorys, purchases, users, messages, errors });
                }
            } else {
                req.body.password = user.password;
                req.body.avatar = req.file.filename;
                req.body.id = user.id;
                req.session.user = req.body;

                db.User.update(req.body, {
                    where: { id: user.id }
                })
                .then(() =>  res.redirect(`/users/profile/${user.id}`));
            }
        }
        console.log(req.body, "--->", errors)
    },

    profile: async (req, res) => {

        const orders = await db.Order.findAll({
            attributes: [ "number" ],
            where:{
                users_id: req.session.user.id
            }
        });
        const items = await db.Item.findAll({
            where: {
                orders_id: orders.map( order => { return order.number })
            },
            order: ["products_id"]
        });
        const purchases = [];
        items.forEach( item => {
            purchases.push({
                id: item.id,
                order: item.orders_id,
                name: item.name,
                price: item.price,
                priceWithoutDiscount: item.priceWithoutDiscount,
                quantity: item.quantity,
                discount: item.discount,
                image: item.image
            });
        })
        // console.log("--------------------->",purchases)
        const users = await db.User.findAll();
        const messages = await db.Message.findAll({
            where: {
                users_id: users.map(user => { return user.id })
            }
        });
        const categorys = await db.Category.findAll();
        res.render('profile', { categorys, purchases, users, messages });
    },

    messages: async (req, res) => {
        var f=new Date();
        const date = (f.getDate() + " / " + f.getMonth() + " / " + f.getFullYear() + "  -  " + f.getHours() + ":" + f.getMinutes() + ":" + f.getSeconds());
        const message = {
            users_id: req.body.users_id,
            to_id: req.body.to_id,
            content: req.body.content,
            products_id: 0,
            from_name: req.body.from_name,
            to_name: req.body.to_name,
            date: date
        }
        console.log(message)
        db.Message.create(message);
        if(req.body.users_id != 1){
            res.redirect(`/users/profile/${req.body.users_id}`)
        } else {
            res.redirect(`/users/admin/${req.body.users_id}`)
        }
    },

    logout: (req, res) => {
        req.session.user = null;
        req.session.cart = null;
        res.clearCookie("user");
        res.redirect("/");
    },

}
module.exports = controllers;