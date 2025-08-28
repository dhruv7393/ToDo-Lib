const sortToDos = require("./sortData");
const {
  getCurrentCategory,
  indexOfCategoryById,
  toggleTaskDoneStatus,
  categoryStatusNeedsUpdate,
  toggleCategoryDoneStatus,
} = require("./utilsForVaccation");

/**
 * Toggles the done status of a task and updates its priority accordingly.
 * @param {Array} data - The array of category objects.
 * @param {string} _id - The _id of the category containing the task.
 * @param {string} name - The name of the task to toggle.
 * @param {boolean} status - The new done status (true for done, false for not done).
 * @returns {Array} - The updated array of categories.
 */
const toggleTaskDone = (data, _id, name, status) => {
  let dataCopy = JSON.parse(JSON.stringify(data));

  let currentCategory = getCurrentCategory(dataCopy, _id);
  let indexOfCurrentCategory = indexOfCategoryById(dataCopy, _id);
  currentCategory = toggleTaskDoneStatus(currentCategory, name, status);
  dataCopy[indexOfCurrentCategory] = currentCategory;

  if (categoryStatusNeedsUpdate(currentCategory)) {
    dataCopy = toggleCategoryDoneStatus(dataCopy, currentCategory, status);
  }

  return sortToDos(dataCopy);
};

module.exports = toggleTaskDone;
