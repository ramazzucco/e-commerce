const db = require('../database/models');

module.exports = async (req, res, next) => {

    if(req.query._page == undefined){
        next()
    } else {
        const queryPage = parseInt(req.query._page);
        const page = (queryPage - 1) * 2;
        const categorys = await db.Category.findAll();
        const category = categorys.filter( c => {
            if(c.id == req.params.category) {
                return c;
            }
        });
        const allProducts = await db.Product.findAll({
            where: {
                category_id: req.params.category
            }
        });
        const totalPages = allProducts.length %2 == 0 ? (allProducts.length / 2) : (allProducts.length / 2) + 1;
        console.log("Total de productos de la categoria: ",totalPages,"Total de paginas: ",totalPages)

        const productsByName = await db.Product.findAll({
            where: {
                category_id: req.params.category
            }, order: [ ["name"] ], offset: page, limit: 2
        });
        const productsByPrice = await db.Product.findAll({
            where: {
                category_id: req.params.category
            }, order: [ ["price"] ], offset: page, limit: 2
        });
        res.render(`category`, { productsByName, productsByPrice, totalPages, categorys, category})
    }

}
