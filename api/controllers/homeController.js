
module.exports = {
    get: async (req, res) => {
        console.log(req.session);
        res.render('home')
    }
}