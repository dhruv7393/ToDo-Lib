const sortToDos = require("./sortData");
const {
  getCurrentCategory,
  getCurrentTask,
  indexOfCategoryById,
} = require("./utilsForVaccation");

/**
 * Updates an existing task in a category.
 * @param {Array} data - The array of category objects.
 * @param {string} _id - The _id of the category containing the task.
 * @param {string} taskName - The name of the task to update.
 * @param {Object} updateDetails - The object containing properties to update (name, notes, canBeRepeated, when).
 * @returns {Array} - The updated array of categories.
 */
const updateTask = (data, _id, taskName, updateDetails) => {
  // Create a deep copy of data to avoid mutation
  let dataCopy = JSON.parse(JSON.stringify(data));

  let currentCategory = getCurrentCategory(dataCopy, _id);
  let currentCategoryIndex = indexOfCategoryById(dataCopy, _id);
  let currentTask = getCurrentTask(currentCategory, taskName);
  let currentTaskIndex = currentCategory.tasks.findIndex(
    (task) => task.name === taskName
  );

  if (updateDetails.notes !== undefined) {
    currentTask = { ...currentTask, notes: updateDetails.notes }; // Clone currentTask to avoid mutation
  }

  if (updateDetails.canBeRepeated !== undefined) {
    currentTask = {
      ...currentTask,
      canBeRepeated: updateDetails.canBeRepeated,
    };
  }

  if (updateDetails.when !== undefined && updateDetails.when !== "") {
    currentTask = { ...currentTask, when: updateDetails.when };
  } else if (updateDetails.when === undefined || updateDetails.when === "") {
    // Remove when property if not present in updateDetails or if empty string
    delete currentTask.when;
    // Set canBeRepeated to false if updateDetails does not have when
    currentTask.canBeRepeated = false;
  }

  currentCategory.tasks[currentTaskIndex] = currentTask;

  dataCopy[currentCategoryIndex] = currentCategory;
  // Use sortToDos to return the data
  return sortToDos(dataCopy);
};

module.exports = updateTask;
