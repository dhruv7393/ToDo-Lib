const sortToDos = require("./sortData");
const {
  reaarangeVaccation,
  getCurrentCategory,
} = require("./utilsForVaccation");

/**
 * Updates the priority of a category and rearranges priorities accordingly.
 * @param {Array} data - The array of category objects.
 * @param {string} _id - The _id of the category to update.
 * @param {number} newPriority - The new priority to set.
 * @returns {Array} - The updated array of categories.
 */
const updateCategoryPriority = (data, _id, newPriority) => {
  let dataCopy = JSON.parse(JSON.stringify(data));
  let currentCategory = getCurrentCategory(dataCopy, _id);
  dataCopy = reaarangeVaccation(
    dataCopy,
    currentCategory.priority,
    newPriority
  );
  return sortToDos(dataCopy);
};

module.exports = updateCategoryPriority;
