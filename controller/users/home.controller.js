const index = (req , res) =>{
    res.render("users/index.pug" ,{
        pageTitle : "Trang chủ"
    })
}

module.exports = {
    index,
}