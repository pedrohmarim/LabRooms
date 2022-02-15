const CategoriesModel = require("../models/CategoriesModel");

module.exports = {
  async handleGetCategory(request, response) {
    const result = await CategoriesModel.find();
    return response.json(result);
  },

  async handleGetCategoryById(request, response) {
    const { _id } = request.headers;

    if (_id) {
      const result = await CategoriesModel.findOne({ _id });
      const { Title, Icon } = result;
      return response.json({ Title, Icon });
    }
  },
};
