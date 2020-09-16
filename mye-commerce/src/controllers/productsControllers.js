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
            const products = await db.Product.findAll({
                where:{
                    id: req.body.id
                }
            })
            const priceWithDiscount = products.map(product => {
                const discount = (product.price * product.discount) / 100;
                return product.price - discount
            })
            const totalPrice = priceWithDiscount.reduce((acum, price) => {
                return acum + price
            })
            res.render("cart", { products, categorys, priceWithDiscount, totalPrice })
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
        const productsByName = await db.Product.findAll({
            where: {
                category_id: idCategory
            }, order: [ ["name"] ]
        });
        const productsByPrice = await db.Product.findAll({
            where: {
                category_id: idCategory
            }, order: [ ["price"] ]
        });
        res.render("category", { productsByName, productsByPrice,categorys, category })
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
    // Create - crear
    create: async (req, res) => {
        const products = await db.Product.findAll()
        const categorys = await db.Category.findAll()
        res.render('productCreate', { products, categorys });
    },

    // Create -  guardar
    store: async (req, res) => {
        console.log(req.file)

        let errors = req.file ? req.file.error : undefined;
        const user = req.session.user
        if (errors != undefined) {
            const products = await db.Product.findAll()
            const categorys = await db.Category.findAll()
            return res.render("productCreate", { errors, products, categorys })
        } else {
            product = req.body;
            console.log(product.category_id)
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

        if (errors != undefined) {
            const product = await db.Product.findByPk(req.params.id);
            const categorys = await db.Category.findAll();
            res.render("productEdit", { errors, product, categorys });
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