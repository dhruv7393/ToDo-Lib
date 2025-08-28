const sortToDos = require("./sortData");
const { deleteCategory } = require("./utilsForVaccation");

/**
 * Deletes a category by its ID.
 * @param {Array} data - The array of category objects.
 * @param {string} _id - The _id of the category to delete.
 * @returns {Array} - The updated array of categories with the specified category removed.
 */
const deleteCategoryById = (data, _id) => {
  // Make a deep copy of data to avoid mutation
  let dataCopy = JSON.parse(JSON.stringify(data));
  dataCopy = deleteCategory(dataCopy, _id);
  return sortToDos(dataCopy);
};

module.exports = deleteCategoryById;
