const sortToDos = require("./sortData");

/**
 * Updates the priority of a task within a category and rearranges task priorities accordingly.
 * @param {Array} data - The array of category objects.
 * @param {string} _id - The _id of the category containing the task.
 * @param {string} name - The name of the task to update.
 * @param {number} newPriority - The new priority to set for the task.
 * @returns {Array} - The updated array of categories.
 */
const updateTaskPriority = (data, _id, name, newPriority) => {
  const dataCopy = JSON.parse(JSON.stringify(data));
  // Clone data to avoid mutation
  const categories = [...dataCopy];
  const categoryIdx = categories.findIndex((cat) => cat._id === _id);
  if (categoryIdx === -1) return categories;

  const category = categories[categoryIdx];
  const taskIdx = category.tasks.findIndex((task) => task.name === name);
  if (taskIdx === -1) return categories;

  const oldPriority = category.tasks[taskIdx].priority;

  if (newPriority < oldPriority) {
    // Increase priority of tasks between newPriority and oldPriority by 1
    category.tasks.forEach((task) => {
      if (
        task.name !== name &&
        task.priority >= newPriority &&
        task.priority < oldPriority
      ) {
        task.priority += 1;
      }
    });
  } else if (newPriority > oldPriority) {
    // Decrease priority of tasks between oldPriority and newPriority by 1
    category.tasks.forEach((task) => {
      if (
        task.name !== name &&
        task.priority > oldPriority &&
        task.priority <= newPriority
      ) {
        task.priority -= 1;
      }
    });
  }

  // Set the task's priority to newPriority
  category.tasks[taskIdx].priority = newPriority;

  // Use sortToDos to rearrange the categories and their tasks
  return sortToDos(categories);
};

module.exports = updateTaskPriority;
