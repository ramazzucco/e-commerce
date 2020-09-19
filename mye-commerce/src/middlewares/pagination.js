const db = require('../database/models');

module.exports = async (req, res, next) => {

    if(req.query._page == undefined){
        next()
    } else {
        const queryPage = parseInt(req.query._page);
        console.log(queryPage)
        const page = (queryPage - 1) * 2;
        const categorys = await db.Category.findAll();
        const category = categorys.filter( c => {
            if(c.id == req.params.category) {
                return c;
            }
        });
        const totalProducts = await db.Product.findAll({
            where: {
                category_id: req.params.category
            }
        });
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
        res.render(`category`, { productsByName, productsByPrice, totalProducts, categorys, category})
    }

}
