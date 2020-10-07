let db = require("../../database/models");

const controller = {
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
                return { name: category.title }
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
        const product = await db.Products.findByPk(req.params.id, {
            include: ['category']
        });
        res.json({
            meta: {
                status: 200,
                link: '/api/product/' + req.params.id
            },
            data: {
                    id: product.id,
                    name: product.name,
                    type: product.type,
                    price: product.price,
                    weight: product.weight,
                    image: `/img/${product.image}`,
                    category: product.category,
                    link: `/api/product/${product.id}`
                }
        })
    }
}

module.exports = controller;