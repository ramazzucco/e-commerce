const db = require('../database/models');
const { Op } = db.Sequelize;

const controllers = {
    index: async (req, res) => {
        const products = await db.Product.findAll();
        const visitasId = await db.Visita.findAll({
            where: {
                numero: {
                    [Op.gt]: 2
                }
            }, attributes: ["products_id"]
        });
        const masVisitados = await db.Product.findAll({
            where:{
                id: visitasId.map( visita => { return visita.products_id })
            }
        });
        const categorys = await db.Category.findAll();
        res.render("index", { categorys, products, masVisitados })
    },
    search: async (req, res) => {
        const products = await db.Product.findAll({
            where: {
                name: { [Op.like]: `%${req.query.search}%` }
            }
        })
        const categorys = await db.Category.findAll();
        const categoryTitle = await db.Category.findOne({
            where:{
                id: products[0].category_id
            }
        })
        const category = [ categoryTitle ];
        const title = `${req.query.search}`;

        res.render("category", { products, category , categorys, title })
    },
    orderBy: async (req, res) => {
        console.log(JSON.stringify(req.body.orderby))
        // al objetoBusequeda hay que sacarle las comillas mediante algun metodo
        const objetoBusequeda = JSON.stringify(req.body.orderby)

        const nombreAscendente = await db.Product.findAll();
        const nombreDescendente = await db.Product.findAll();
        const precioAscendente = await db.Product.findAll();
        const precioDescendente = await db.Product.findAll();
    }
}
module.exports = controllers;