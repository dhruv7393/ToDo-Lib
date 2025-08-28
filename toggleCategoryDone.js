const sortToDos = require("./sortData");
const {
  getCurrentCategory,
  toggleCategoryDoneStatus,
} = require("./utilsForVaccation");

/**
 * Toggles the done status of a category and all its tasks.
 * @param {Array} data - The array of category objects.
 * @param {string} _id - The _id of the category to toggle.
 * @param {boolean} [status] - Optional. The new done status. If not provided, auto-determines based on current task states.
 * @returns {Array} - The updated array of categories.
 */
const toggleCategoryDone = (data, _id, status) => {
  // Clone data to avoid mutation
  let dataCopy = JSON.parse(JSON.stringify(data));

  let currentCategory = getCurrentCategory(dataCopy, _id);

  dataCopy = toggleCategoryDoneStatus(dataCopy, currentCategory, status, true);

  return sortToDos(dataCopy);
};

module.exports = toggleCategoryDone;
