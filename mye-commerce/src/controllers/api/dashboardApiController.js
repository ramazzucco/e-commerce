let db = require("../../database/models");
const { sequelize } = db.Sequelize;

const controller = {

    widgets: async (req, res) => {
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
        const products = await db.Product.findAll()

        let amount = 0;

        products.map(product => {
            amount = amount + (product.price * product.stock)
        })
        res.json({
            meta: {
                status: 200,
                link: "/api/dashboard/widgets"
            },
            data: [
                {
                    type: "primary",
                    text: "Total en Mercaderia",
                    value: amount.toLocaleString(),
                    icon: "fa-dollar-sign"
                },
                {
                    type: "success",
                    text: "Ganancias",
                    value: profits.toLocaleString(),
                    icon: "fa-dollar-sign"
                },
                {
                    type: "danger",
                    text: "Pendiente",
                    value: pending.toLocaleString(),
                    icon: "fa-dollar-sign"
                },
            ]
        })

    },
    lastProduct: async (req, res) => {
        const product = await db.Product.findOne({
            limit: 1,
            order: [["id", 'DESC']]
        })
        const category = await db.Category.findAll({
            where: {
                id: product.category_id
            }
        })
        res.json({
            meta: {
                status: 200,
                link: "/api/dashboard/lastProduct"
            },
            data:
                {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    description: product.description,
                    image: product.image,
                    stock: product.stock,
                    discount: product.discount,
                    category: category[0].title,
                    link: `http://localhost:3000/products/${category[0].id}/${product.id}`
                }
        })
    },
    categories: async (req, res) => {
        const categorys = await db.Category.findAll({ include: ["products"] })
        res.json({
            meta: {
                status: 200,
                link: "/api/dashboard/categories"
            },
            data:
                categorys.map(category => {
                    return {
                        category: category.name,
                        total_products: category.products.length,
                        products: category
                    }
                })

        })

    },
    allProducts: async (req, res) => {
        const products = await db.Product.findAll ({include: ['category']});
        res.json ({
            meta: {
                status: 200,
                totalItems: products.length,
                link: 'api/dashboard/allProducts'
            },
            data: products.map (product => {
                return {
                    id: product.id,
                    name: product.name,
                    category: product.category.name,
                    price: product.price,
                    type: product.type,
                    weight: product.weight
                }
            })
        })

    },
    celulares: async (req, res) => {

        const celulares = await db.Product.findAll({
            where: { category_id: 1}
        });
        let total = 0;
        celulares.map(product => {
            total = total + (Number(product.price) * Number(product.stock));
        })
        res.json({
            meta: {
                status: 200,
                title: "Celulares",
                totalItems: celulares.length,
                totalPrice: total.toLocaleString(),
                link: 'api/dashboard/celulares'
            },
            data: celulares.map(product => {
                return {
                    id: product.id,
                    name: product.name,
                    price: Number(product.price).toLocaleString(),
                    description: product.description,
                    image: product.image,
                    stock: product.stock,
                    discount: product.discount,
                    category: product.category,
                    link: `/api/product/${product.id}`
                }
            })
        })
    },
    laptops: async (req, res) => {

        const laptops = await db.Product.findAll({
            where: { category_id: 2}
        });
        let total = 0;
        laptops.map(product => {
            total = total + (Number(product.price) * Number(product.stock));
        })
        res.json ({
            meta: {
                status: 200,
                title: "Laptops",
                totalItems: laptops.length,
                totalPrice: total.toLocaleString(),
                link: 'api/dashboard/laptops'
            },
            data: laptops.map (product => {
                return {
                    id: product.id,
                    name: product.name,
                    price: Number(product.price).toLocaleString(),
                    description: product.description,
                    image: product.image,
                    stock: product.stock,
                    discount: product.discount,
                    category: product.category,
                    link: `/api/product/${product.id}`
                }
            })
        })
    },
    parlantes: async (req, res) => {

        const parlantes = await db.Product.findAll({
            where: { category_id: 3}
        });
        let total = 0;
        parlantes.map(product => {
            total = total + (Number(product.price) * Number(product.stock));
        })
        res.json ({
            meta: {
                status: 200,
                title: "Parlantes",
                totalItems: parlantes.length,
                totalPrice: total.toLocaleString(),
                link: 'api/dashboard/parlantes'
            },
            data: parlantes.map (product => {
                return {
                    id: product.id,
                    name: product.name,
                    price: Number(product.price).toLocaleString(),
                    description: product.description,
                    image: product.image,
                    stock: product.stock,
                    discount: product.discount,
                    category: product.category,
                    link: `/api/product/${product.id}`
                }
            })
        })
    },
    teclados: async (req, res) => {

        const teclados = await db.Product.findAll({
            where: { category_id: 4}
        });
        let total = 0;
        teclados.map(product => {
            total = total + (Number(product.price) * Number(product.stock));
        })
        res.json ({
            meta: {
                status: 200,
                title: "Teclados",
                totalItems: teclados.length,
                totalPrice: total.toLocaleString(),
                link: 'api/dashboard/teclados'
            },
            data: teclados.map (product => {
                return {
                    id: product.id,
                    name: product.name,
                    price: Number(product.price).toLocaleString(),
                    description: product.description,
                    image: product.image,
                    stock: product.stock,
                    discount: product.discount,
                    category: product.category,
                    link: `/api/product/${product.id}`
                }
            })
        })
    },
    mouse: async (req, res) => {

        const mouse = await db.Product.findAll({
            where: { category_id: 5 }
        });
        let total = 0;
        mouse.map(product => {
            total = total + (Number(product.price) * Number(product.stock));
        })
        res.json ({
            meta: {
                status: 200,
                title: "Mouse",
                totalItems: mouse.length,
                totalPrice: total.toLocaleString(),
                link: 'api/dashboard/mouse'
            },
            data: mouse.map (product => {
                return {
                    id: product.id,
                    name: product.name,
                    price: Number(product.price).toLocaleString(),
                    description: product.description,
                    image: product.image,
                    stock: product.stock,
                    discount: product.discount,
                    category: product.category,
                    link: `/api/product/${product.id}`
                }
            })
        })
    },
    promotions: async (req, res) => {
        const promotions = await db.Promotion.findAll();
        const products = await db.Product.findAll({
            where: {
                id: promotions.map(promo => { return promo.products_id })
            }, attributes: ["name"]
        })
        res.json({
            meta: {
                status: 200,
                totalItems: promotions.length,
                link: 'api/dashboard/promotions'
            },
            data: promotions.map ((promo,i) => {
                return {
                    product_name: products[i].name,
                    image: promo.image,
                    description: promo.description,
                }
            })
        })
    },
    usersWithMessages: async (req, res) => {
        const users = await db.User.findAll();
        const messages = await db.Message.findAll({
            where: {
                users_id: users.map(user => { return user.id })
            }
        });
        const usersId = messages.map( m => { if(m.users_id != 1){ return m.users_id } })
        const uniqueUsersId = [...new Set(usersId)]
        const usersIdFiltered = uniqueUsersId.filter( user => { return user != undefined })
        const usersWithMessages = [];
        for(user of users){
            usersIdFiltered.map(id => {
                if(id == user.id){
                    usersWithMessages.push({
                        id: user.id,
                        name: user.first_name + " " + user.last_name,
                    })
                }
            })
        }

        res.json({
            meta:{
                status: 200,
                totalItems: usersWithMessages.length,
                link: 'api/dashboard/usersWithMessages'
            },
            data: usersWithMessages
        })
    },
    messages: async (req, res) => {
        const messages = await db.Message.findAll();

        res.json({
            meta:{
                status: 200,
                totalItems: messages.length,
                link: 'api/dashboard/messages'
            },
            data: messages.map( message => {
                return {
                    id: message.id,
                    users_id: message.users_id,
                    to_id: message.to_id,
                    content: message.content,
                    products_id: message.products_id,
                    from_name: message.from_name,
                    to_name: message.to_name,
                    date: message.date
                }
            })
        })
    },
    promotions_store: async (req, res) => {
        const promotion = req.body
        console.log(promotion)
    }
}

module.exports = controller;