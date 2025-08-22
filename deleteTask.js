const updateTaskPriority = require("./updateTaskPriority");
const toggleCategoryDone = require("./toggleCategoryDone");
const sortToDos = require("./sortData");

/**
 * Deletes a task from a particular category.
 * @param {Array} data - The array of category objects.
 * @param {string} _id - The _id of the category containing the task.
 * @param {string} name - The name of the task to delete.
 * @returns {Array} - The updated array of categories with the specified task removed.
 */
const deleteTask = (data, _id, name) => {
  // Create a deep copy of data to avoid mutation
  const dataCopy = JSON.parse(JSON.stringify(data));

  // Find the category by _id
  const categoryIdx = dataCopy.findIndex((cat) => cat._id === _id);
  if (categoryIdx === -1) return sortToDos(dataCopy);

  const category = dataCopy[categoryIdx];

  // Find the task by name
  const taskIdx = category.tasks.findIndex((task) => task.name === name);
  if (taskIdx === -1) return sortToDos(dataCopy);

  // Use updateTaskPriority to set the priority of task to max in category
  const maxPriority = category.tasks.length;
  let updatedData = updateTaskPriority(dataCopy, _id, name, maxPriority);

  // Find the updated category and task after priority update
  const updatedCategoryIdx = updatedData.findIndex((cat) => cat._id === _id);
  const updatedCategory = updatedData[updatedCategoryIdx];
  const updatedTaskIdx = updatedCategory.tasks.findIndex(
    (task) => task.name === name
  );

  // Delete the task
  updatedCategory.tasks.splice(updatedTaskIdx, 1);

  // Update category counters
  const doneTasks = updatedCategory.tasks.filter((t) => t.done).length;
  const notDoneTasks = updatedCategory.tasks.length - doneTasks;

  updatedCategory.done = doneTasks;
  updatedCategory.notDone = notDoneTasks;
  updatedCategory.total = updatedCategory.tasks.length;

  // Use toggleCategoryDone at last on current category
  updatedData = toggleCategoryDone(updatedData, _id);

  // Finally use sortToDos and return data
  return sortToDos(updatedData);
};

module.exports = deleteTask;
