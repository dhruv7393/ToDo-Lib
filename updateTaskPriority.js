const sortToDos = require("./sortData");
const {
  getCurrentCategory,
  indexOfCategoryById,
  getCurrentTask,
  reaarangeVaccation,
} = require("./utilsForVaccation");

/**
 * Updates the priority of a task within a category and rearranges task priorities accordingly.
 * @param {Array} data - The array of category objects.
 * @param {string} _id - The _id of the category containing the task.
 * @param {string} name - The name of the task to update.
 * @param {number} newPriority - The new priority to set for the task.
 * @returns {Array} - The updated array of categories.
 */
const updateTaskPriority = (data, _id, name, newPriority) => {
  let dataCopy = JSON.parse(JSON.stringify(data));

  let currentCategory = getCurrentCategory(dataCopy, _id);
  let currentCategoryIndex = indexOfCategoryById(dataCopy, _id);
  let currentTask = getCurrentTask(currentCategory, name);
  currentCategory.tasks = reaarangeVaccation(
    currentCategory.tasks,
    currentTask.priority,
    newPriority
  );
  dataCopy[currentCategoryIndex] = currentCategory;
  return sortToDos(dataCopy);
};

module.exports = updateTaskPriority;
