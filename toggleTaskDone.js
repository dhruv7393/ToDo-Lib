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

  const currentPriority = task.priority;

  // Update the task's done status
  task.done = status;

  let newPriority;

  if (status) {
    // Task is marked done: set priority to number of tasks in category
    newPriority = category.tasks.length;

    // Reduce priority by 1 for tasks with priority greater than current task's original priority
    category.tasks.forEach((t) => {
      if (t.name !== name && t.priority > currentPriority) {
        t.priority -= 1;
      }
    });
  } else {
    // Task is marked not done: increase priority by 1 for done tasks with priority < current task's original priority
    const doneTasks = category.tasks.filter((t) => t.done && t.name !== name);

    if (doneTasks.length === 0) {
      // No done tasks, set priority to length of tasks in category
      newPriority = category.tasks.length;
    } else {
      // Increase priority by 1 for done tasks with priority less than current task's original priority
      category.tasks.forEach((t) => {
        if (t.name !== name && t.done && t.priority < currentPriority) {
          t.priority += 1;
        }
      });

      // Reduce current task's priority by 1
      newPriority = currentPriority - 1;
    }
  }

  // Set the task's new priority
  task.priority = newPriority;

  // Update category counters
  const doneTasks = category.tasks.filter((t) => t.done).length;
  const notDoneTasks = category.tasks.length - doneTasks;

  category.done = doneTasks;
  category.notDone = notDoneTasks;

  // Update category's isMarkedDone status based on task completion
  const allTasksDone = category.tasks.every((task) => task.done);
  const allTasksNotDone = category.tasks.every((task) => !task.done);

  if (allTasksDone) {
    category.isMarkedDone = true;
  } else if (allTasksNotDone) {
    category.isMarkedDone = false;
  } else {
    // Mixed states: set to false (especially when category was marked done but now has incomplete tasks)
    category.isMarkedDone = false;
  }
  // For mixed states, keep current isMarkedDone status

  return sortToDos(dataCopy);
};

module.exports = toggleTaskDone;
