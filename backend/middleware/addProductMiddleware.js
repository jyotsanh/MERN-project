const AddProductMiddleware = (request, response, next) => {
    if (request.body) {
        const { name, price, description, category, quantity, frame_material, lens_material, frame_shape } = request.body;
        if (!name) {
            return response.status(400).send({ "name": "name key is not provided" });
        }
        if (!price) {
            return response.status(400).send({ "price": "price key is not provided" });
        }
        if (!description) {
            return response.status(400).send({ "description": "description key is not provided" });
        }
         // Update the request body with the parsed category

        if (!quantity) {
            return response.status(400).send({ "quantity": "quantity key is not provided" });
        }
        if (!frame_material) {
            return response.status(400).send({ "frame_material": "frame_material key is not provided" });
        }
        if (!lens_material) {
            return response.status(400).send({ "lens_material": "lens_material key is not provided" });
        }
        if (!frame_shape) {
            return response.status(400).send({ "frame_shape": "frame_shape key is not provided" });
        }
        if (isNaN(price)) {
            return response.status(400).send({ "price": "price key is not a number" });
        }
        if (isNaN(quantity)) {
            return response.status(400).send({ "quantity": "quantity key is not a number" });
        }
        next();
    } else {
        return response.status(400).send({ "msg": "request.body error" });
    }
};

module.exports = AddProductMiddleware;
