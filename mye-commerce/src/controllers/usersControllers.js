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
        const userMessages = await db.User.findAll({
            where: {
                id: messages.map( message => { return message.users_id })
            }
        })
        res.render("admin", { products, categorys, users, admin, messages });
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
    profile: async (req, res) => {
        const orders = await db.Order.findAll({
            where:{
                users_id: req.session.user.id
            }
        });
        const ordersId = orders.map( order => { return order.id });
        const items = await db.Item.findAll({
            where: {
                orders_id: ordersId
            },
            order: ["products_id"]
        });
        const productsId = items.map( item => { return item.products_id });
        const products = await db.Product.findAll({
            where: {
                id: productsId
            }
        });
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
        res.clearCookie("user");
        res.redirect("/");
    },
}
module.exports = controllers;