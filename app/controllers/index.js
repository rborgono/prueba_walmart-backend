const functions = require('../functions');
const db = require('../models');

module.exports = {

    /**
     * Servicio createUser: busca el usuario en la BD y si no existe, lo crea
     * */ 
    findProducts: (req, res) => {

        let pattern = req.params.pattern;
        console.log('pattern', pattern);

        let findById = req.params.findById === 'true';
        console.log('findById', findById);

        let query;
        if(findById) {
            query = { id: parseInt(pattern) };
        } else {
            query = { $or: [
                { brand: { $regex: new RegExp(`.*${pattern}.*`) } },
                { description: { $regex: new RegExp(`.*${pattern}.*`) } }
             ] };
        }
        console.log('query', query);
        let isPalindrome = functions.isPalindrome(pattern);
        db.products.find(query)
            .then(response => {
                console.log('response', response);
                let result = response.map(item => { 
                    return {
                        id: item.id,
                        brand: item.brand,
                        description: item.description,
                        image: item.image,
                        price: item.price,
                        discount: isPalindrome ? 50 : 0,
                        priceWithDiscount: isPalindrome ? Math.floor(item.price/2) : item.price
                    } 
                });
                res.send({ result, error: {} });
            })
            .catch(error => {
                console.log('error', error);
                res.send( {result: {}, error });
            });

    }

};