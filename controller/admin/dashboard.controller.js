const index = (req , res) =>{
    res.render("admin/index.pug" ,{
        pageTitle : "Trang admin"
    })
}

module.exports = {
    index,
}