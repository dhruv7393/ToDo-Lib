const sortToDos = require("./sortData");

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
  const dataCopy = JSON.parse(JSON.stringify(data));

  // Find the category by _id
  const categoryIdx = dataCopy.findIndex((cat) => cat._id === _id);
  if (categoryIdx === -1) return sortToDos(dataCopy);

  const category = dataCopy[categoryIdx];

  // Find the task by name
  const taskIdx = category.tasks.findIndex((task) => task.name === taskName);
  if (taskIdx === -1) return sortToDos(dataCopy);

  const task = category.tasks[taskIdx];

  // Update task properties with values from updateDetails, keeping existing priority and done
  if (updateDetails.name !== undefined) {
    task.name = updateDetails.name;
  }

  if (updateDetails.notes !== undefined) {
    task.notes = updateDetails.notes;
  }

  if (updateDetails.canBeRepeated !== undefined) {
    task.canBeRepeated = updateDetails.canBeRepeated;
  }

  if (updateDetails.when !== undefined && updateDetails.when !== "") {
    task.when = updateDetails.when;
  } else if (updateDetails.when === undefined || updateDetails.when === "") {
    // Remove when property if not present in updateDetails or if empty string
    delete task.when;
    // Set canBeRepeated to false if updateDetails does not have when
    task.canBeRepeated = false;
  }

  // Priority and done use existing values (no changes)
  // task.priority remains unchanged
  // task.done remains unchanged

  // Use sortToDos to return the data
  return sortToDos(dataCopy);
};

module.exports = updateTask;
