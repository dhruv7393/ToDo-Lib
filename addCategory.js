const sortToDos = require("./sortData");
const { addNewCategory } = require("./utilsForVaccation");

/**
 * Adds a new category to the data.
 * @param {Array} data - The array of category objects.
 * @param {string} name - The name of the new category.
 * @param {string} color - The color of the new category.
 * @returns {Array} - The updated array of categories with the new category added.
 */
const addCategory = (data, _id, name, color, border) => {
  const dataCopy = addNewCategory(data, _id, name, color, border);
  // Use sortToDos and return the data
  return sortToDos(dataCopy);
};

module.exports = addCategory;
