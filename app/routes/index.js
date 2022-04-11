module.exports = (app, router) => {
    const controllers = require('../controllers');
    router.get('/findProducts/:pattern/:findById', controllers.findProducts);
    app.use('/', router);
}
