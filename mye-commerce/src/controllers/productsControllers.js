const controllers = {
    category: (req, res) => {
        res.render("category")
    },
    detail: (req, res) => {
        res.render("detail")
    }
}
module.exports = controllers;