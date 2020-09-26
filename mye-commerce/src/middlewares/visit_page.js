module.exports = (req,res, next) => {

    if(!req.cookies.visit_page){
        req.session.visit_page = 1;
        res.cookie("visit_page", req.session.visit_page,{maxAge: 1000 * 60 * 60 * 24 * 90});
        console.log("COOKIES - VISIT_PAGE: ",req.cookies.visit_page)
    } else {
        const newVisit = req.cookies.visit_page;
        res.cookie("visit_page", Number(newVisit) + 1,{maxAge: 1000 * 60 * 60 * 24 * 90});
    }

    next();

}
