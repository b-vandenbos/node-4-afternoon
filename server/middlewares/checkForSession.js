module.exports = function(req, res, next) {
    if (req.session.user) {
        return next();
    } else if (!req.session.user) {
        req.session.user = {
            username: '',
            cart: [],
            total: 0
        }
        return next();
    }
}