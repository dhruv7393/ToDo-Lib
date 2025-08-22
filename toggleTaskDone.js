const updateTaskPriority = require("./updateTaskPriority");
const toggleCategoryDone = require("./toggleCategoryDone");
const sortToDos = require("./sortData");

/**
 * Toggles the done status of a task and updates its priority accordingly.
 * @param {Array} data - The array of category objects.
 * @param {string} _id - The _id of the category containing the task.
 * @param {string} name - The name of the task to toggle.
 * @param {boolean} status - The new done status (true for done, false for not done).
 * @returns {Array} - The updated array of categories.
 */
const toggleTaskDone = (data, _id, name, status) => {
  // Clone data to avoid mutation
  const dataCopy = JSON.parse(JSON.stringify(data));

  // Find the category
  const categoryIdx = dataCopy.findIndex((cat) => cat._id === _id);
  if (categoryIdx === -1) return dataCopy;

  const category = dataCopy[categoryIdx];

  // Find the task
  const taskIdx = category.tasks.findIndex((task) => task.name === name);
  if (taskIdx === -1) return dataCopy;

  const task = category.tasks[taskIdx];

  // Update the task's done status
  task.done = status;

  let newPriority;

  if (status) {
    // Task is marked done: set priority to length of task array + 1
    newPriority = category.tasks.length + 1;
  } else {
    // Task is marked not done: find max priority of not done tasks + 1
    const notDoneTasks = category.tasks.filter(
      (t) => !t.done && t.name !== name
    );
    if (notDoneTasks.length === 0) {
      // No other not done tasks, set priority to 1
      newPriority = 1;
    } else {
      const maxPriority = Math.max(...notDoneTasks.map((t) => t.priority));
      newPriority = maxPriority + 1;
    }
  }

  // Update category counters
  const doneTasks = category.tasks.filter((t) => t.done).length;
  const notDoneTasks = category.tasks.length - doneTasks;

  category.done = doneTasks;
  category.notDone = notDoneTasks;

  // Use updateTaskPriority to set the new priority
  const updatedData = updateTaskPriority(dataCopy, _id, name, newPriority);

  // Pass the updated data to toggleCategoryDone to check category status
  return sortToDos(toggleCategoryDone(updatedData, _id));
};

module.exports = toggleTaskDone;
