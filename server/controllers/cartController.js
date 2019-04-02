let swag = require('../models/swag');

module.exports = {
    add: (req, res) => {
        let {id} = req.query;
        let {user} = req.session;
        
        let itemIndex = user.cart.findIndex(swag => Number(swag.id) === Number(id));
        if (itemIndex === -1) {
            let selectedSwag = swag.find( swag => Number(swag.id) === Number(id));
            user.cart.push(selectedSwag);
            user.total += selectedSwag.price;
        }
        res.status(200).send(user);
    },

    delete: (req, res) => {
        let {id} = req.query;
        let {user} = req.session;
        let swagIndex = user.cart.findIndex(swag => Number(swag.id) === Number(id));
        let swagItem = swag.find(swag => Number(swag.id) === Number(id));
        if (swagIndex !== -1) {
            user.cart.splice(swagIndex, 1);
            user.total -= swagItem.price;
        }
        res.status(200).send(user);
    },

    checkout: (req, res) => {
        let {user} = req.session;
        user.cart = [];
        user.total = 0;
        res.status(200).send(user);
    }
}