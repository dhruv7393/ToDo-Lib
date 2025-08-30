const sortToDos = require("./sortData");
const { addNewTask } = require("./utilsForVaccation");

/**
 * Adds a task to a particular category.
 * @param {Array} data - The array of category objects.
 * @param {string} _id - The _id of the category to add the task to.
 * @param {Object} taskDetails - The task object containing task details.
 * @returns {Array} - The updated array of categories.
 */
function addTask(data, _id, taskDetails) {
  // Create a deep copy of data to avoid mutation
  const dataCopy = JSON.parse(JSON.stringify(data));

  dataCopy = addNewTask(dataCopy, _id, taskDetails);

  return sortToDos(dataCopy);
}

module.exports = addTask;
