let db = require("../../database/models");
const fs = require("fs");
const path = require("path");

const controller = {
    store: async (req, res) => {
        req.body.category_id = Number(req.body.category_id);
        req.body.price = Number(req.body.price);
        req.body.stock = Number(req.body.stock);
        req.body.discount = Number(req.body.discount);
        req.body.image = req.file ? req.file.filename : req.body.image
        const product = [req.body]

        const category = await db.Category.findByPk(product.category_id)

        console.log(product)
        if(product.length){
            await db.Product.create(product[0])

            res.json({
                status: 200,
                error: false,
                msg: "Producto creado",
                categoryName: category
            })
        } else {
            res.json({
                status: 404,
                error: true,
                msg: "El Producto no se pudo crear"
            })
        }
        console.log(product, req.file)
    },
    index: async (req, res) => {
        const products = await db.Product.findAll({
            include: ['category'],
            order: ["id"]
        });
        const categorys = await db.Category.findAll();

        res.json({
            meta: {
                status: 200,
                totalItems: products.length,
            },
            categories: categorys.map( category => {
                return { id: category.id, name: category.title }
            }),
            data: products.map(product => {
                return {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    description: product.description,
                    image: product.image,
                    stock: product.stock,
                    discount: product.discount,
                    category: product.category,
                    link: `http://localhost:3000/products/${product.category_id}/${product.id}`
                }
            })
        });
    },
    show: async (req, res, next) => {
        const product = await db.Product.findByPk(req.params.id, {
            include: ['category']
        });
        const categorys = await db.Category.findAll();
        res.json({
            meta: {
                status: 200,
                link: '/api/product/' + req.params.id
            },
            data: {
                id: product.id,
                name: product.name,
                price: product.price,
                description: product.description,
                image: product.image,
                stock: product.stock,
                discount: product.discount,
                category: product.category,
                link: `/api/product/${product.id}`,
                categorys: categorys
            }
        })
    },
    update: async (req, res) => {
        const product = [req.body];

        if(product.length){
            await db.Product.update(product, {
                where: {
                    id: req.params.id
                }
            })

            res.json({
                status: 200,
                error: false,
                msg: "Producto Actualizado"
            })
        } else {
            res.json({
                status: 404,
                error: true,
                msg: "El Producto no se pudo actualizar"
            })
        }
    },
    delete: async (req, res) => {
        const ids = req.params.id.split(",")

        const product = await db.Product.findAll({
            where:{
                id: ids
            }
        })

        product.map(p => {
            if(p.image != "sin_imagen.jpg"){
                fs.unlinkSync(path.join(__dirname,`../../../public/images/${p.image}`))
            }
        })
        const productDeleted = await db.Product.destroy({ where: { id: ids } });
        console.log("PRODUCTO ELIMINADO: ",productDeleted)
        const newProducts = await db.Product.findAll({
            where:{
                category_id: product[0].category_id
            }
        })
        console.log(newProducts)
        res.json({
            status: 200,
            msg: `El producto "${product.name}" fue eliminado`,
            products: newProducts
        })
    }
}

module.exports = controller;