const db = require('../database/models');
const fs = require("fs");
const path = require("path");


const controllers = {
    cart: async (req, res) => {
        console.log(req.body.id)
        if(req.body.id == undefined){
            res.redirect("/")
        } else {
            const categorys = await db.Category.findAll();
            const productsDB = await db.Product.findAll({
                where:{
                    id: req.body.id
                }
            })
            const products = productsDB.map( product => {
                const discount = (product.price * product.discount) / 100;
                const priceWithDiscount = product.price - discount
                product.priceWithDiscount = priceWithDiscount;
                return product;
            })
            let totalPrice = parseFloat(0);
            products.map( product => {
                totalPrice += product.priceWithDiscount;
            })
            res.render("cart", { products, categorys, totalPrice })
        }
    },

    detail: async (req, res) => {
        const id = req.params.id;
        const categorys = await db.Category.findAll();
        const product = await db.Product.findByPk(id);
        const messages = await db.Message.findAll({
            where: {
                products_id: id
            }
        })
        if(product){
            const discount = (product.price * product.discount) / 100;
            const priceWithDiscount = product.price - discount;
            res.render("detail",{ product, categorys, priceWithDiscount, messages });
        }
    },

    category: async (req, res) => {
        const idCategory = req.params.category;
        const categorys = await db.Category.findAll();
        const category = categorys.filter( c => {
            if(c.id == idCategory) {
                return c;
            }
        });
        const allProducts = await db.Product.findAll({
            where: {
                category_id: idCategory
            }
        });
        const totalPages = allProducts.length %2 == 0 ? (allProducts.length / 2) : (allProducts.length / 2) + 1;
        console.log("Total de productos de la categoria: ",totalPages,"Total de paginas: ",totalPages)
        const productsByName = await db.Product.findAll({
            where: {
                category_id: idCategory
            }, order: [ ["name"] ], limit: 2
        });
        const productsByPrice = await db.Product.findAll({
            where: {
                category_id: idCategory
            }, order: [ ["price"] ], limit: 2
        });
        res.render("category", { productsByName, productsByPrice, totalPages, categorys, category })
    },

    messages: async (req, res) => {
        var f=new Date();
        const date = (f.getDate() + " / " + f.getMonth() + " / " + f.getFullYear() + "  -  " + f.getHours() + ":" + f.getMinutes() + ":" + f.getSeconds());
        const message = {
            users_id: req.body.users_id,
            to_id: req.body.to_id,
            content: req.body.content,
            products_id: req.body.products_id,
            from_name: req.body.from_name,
            to_name: req.body.to_name,
            date: date
        }
        db.Message.create(message);
        res.redirect(`/products/${req.body.category_id}/${req.body.products_id}`)
    },

    offers: (req, res) => {
        const user = req.session.user;
        req.body.products_id = Number(req.body.products_id);
        db.Promotion.create(req.body)
        .then(() => res.redirect(`/users/admin/${user.id}`))
    },

    // Create - crear
    create: async (req, res) => {
        const products = await db.Product.findAll()
        const categorys = await db.Category.findAll()
        res.render('productCreate', { products, categorys });
    },

    // Create -  guardar
    store: async (req, res) => {
        console.log("from create product: ",req.file.error)

        const errors = req.file ? req.file.error : undefined;
        console.log("----------->",errors)
        const user = req.session.user;

        if (errors != undefined) {
            // Selecciono todos los datos que necesita la pagina "admin".
            const products = await db.Product.findAll({ include: "category" });
            const categorys = await db.Category.findAll();
            const users = await db.User.findAll();
            const messages = await db.Message.findAll({ where: { users_id: users.map(user => { return user.id })}});
            const orderSuccess = await db.Order.findAll({ where: { status: "success" }});
            const profits = await db.Item.sum("price",{ where: { orders_id: orderSuccess.map(order => { return order.id})}});
            const orderPending = await db.Order.findAll({ where: { status: "pending" }});
            const pending = await db.Item.sum("price",{ where: { orders_id: orderPending.map(order => { return order.id})}});
            const visit_page = req.cookies.visit_page;

            return res.render("admin",{ products, categorys, users,  messages, visit_page, profits, pending, errors })
        } else {
            product = req.body;
            product.category_id = req.body.category
            product.image = req.file ? req.file.filename : 'sin_imagen.jpg';

            await db.Product
                .create(product)
                .then(storedProduct => { return res.redirect(`/users/admin/${user.id}`)})
                .catch(error => { console.log(error) });
        }

    },

    // Update - editar
    edit: async (req, res) => {
        const product = await db.Product.findByPk(req.params.id);
        const categorys = await db.Category.findAll();
        res.render("productEdit", { product, categorys })
    },

    // Update - actualizar
    update: async (req, res) => {
        const user = req.session.user
        let errors = req.file ? req.file.error : undefined;
        console.log("update product errors: ",errors)

        if (errors != undefined) {
            const product = await db.Product.findByPk(req.params.id);
            const categorys = await db.Category.findAll();
            res.render("admin", { errors, product, categorys });
        } else {
            const product = await db.Product.findByPk(req.params.id)
            req.body.image = req.file ? req.file.filename : `${product.image}`;
            let user = req.session.user;
            db.Product.update(req.body, {
                where: { id: req.params.id }
            })
            .then(() => res.redirect(`/users/admin/${user.id}`))
        }

    },

    // Delete -
    destroy: (req, res) => {
        const user = req.session.user
        db.Product.findByPk(req.params.id)
        // Si el registro existe
        .then(async product => {
            //borramos la imagen de la carpeta /public/images
            fs.unlinkSync(path.join(__dirname,`../../public/images/${product.image}`))
            console.log(product)
            // Lo borramos
            await db.Product.destroy({ where: { id: req.params.id } });

            res.redirect(`/users/admin/${user.id}`)
        })
        .catch(error => console.log(error));
    }
}
module.exports = controllers;