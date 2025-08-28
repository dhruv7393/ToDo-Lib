const sortToDos = require("./sortData");
const {
  getCurrentCategory,
  getCurrentTask,
  deleteTaskByName,
  categoryStatusNeedsUpdate,
  toggleCategoryDoneStatus,
} = require("./utilsForVaccation");

/**
 * Deletes a task from a particular category.
 * @param {Array} data - The array of category objects.
 * @param {string} _id - The _id of the category containing the task.
 * @param {string} name - The name of the task to delete.
 * @returns {Array} - The updated array of categories with the specified task removed.
 */
const deleteTask = (data, _id, name) => {
  // Create a deep copy of data to avoid mutation
  let dataCopy = JSON.parse(JSON.stringify(data));
  dataCopy = deleteTaskByName(dataCopy, _id, name);
  let currentCategory = getCurrentCategory(dataCopy, _id);
  if (categoryStatusNeedsUpdate(currentCategory)) {
    dataCopy = toggleCategoryDoneStatus(
      dataCopy,
      currentCategory,
      !currentCategory.isMarkedDone
    );
  }
  return sortToDos(dataCopy);
};

module.exports = deleteTask;
