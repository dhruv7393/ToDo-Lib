const deleteTask = require("./deleteTask");
const deleteCategoryById = require("./deleteCategoryById");
const updateTask = require("./UpdateTask");
const getModifiedCategories = require("./modifiedCategories");
const sortToDos = require("./sortData");
const updateTaskPriority = require("./updateTaskPriority");
const {
  reaarangeVaccation,
  toggleTaskDoneStatus,
  deleteTaskByName,
  toggleCategoryDoneStatus,
  categoryStatusNeedsUpdate,
} = require("./utilsForVaccation");
const toggleTaskDone = require("./toggleTaskDone");

// Array of days of week starting from Monday
const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

/**
 * Processes recurring tasks and cleans up completed non-repeatable tasks.
 * @param {Array} data - The array of category objects.
 * @returns {Object} - Object containing updated data and deleted category IDs.
 */
function chron(data) {
  // Make a deep copy of data
  let dataCopy = JSON.parse(JSON.stringify(data));
  const today = new Date();
  let hasChanges = true;

  // Keep processing until no more changes are made
  while (hasChanges) {
    hasChanges = false;
    const initialDataCopyString = JSON.stringify(dataCopy);

    // Process tasks in each category
    for (
      let categoryIndex = 0;
      categoryIndex < dataCopy.length;
      categoryIndex++
    ) {
      const category = dataCopy[categoryIndex];
      if (!category) continue; // Category might have been deleted

      let { tasks } = category;

      for (let taskIndex = 0; taskIndex < tasks.length; taskIndex++) {
        const task = tasks[taskIndex];
        if (!task) continue; // Task might have been deleted

        // Delete completed non-repeatable tasks
        if (task.done && !task.canBeRepeated) {
          dataCopy = deleteTaskByName(dataCopy, category._id, task.name);
          hasChanges = true;
          break; // Restart processing from the beginning
        }

        // Reset repeatable tasks if they match today's conditions
        if (
          task.done &&
          task.canBeRepeated &&
          (task.when === today.getDate().toString() ||
            task.when?.includes(daysOfWeek[today.getDay()]))
        ) {
          dataCopy = toggleTaskDone(dataCopy, category._id, task.name, false);
          dataCopy = updateTaskPriority(dataCopy, category._id, task.name, 1);
          hasChanges = true;
          break; // Restart processing from the beginning
        }

        // Update tasks with expired dates
        if (
          Object.keys(task).includes("when") &&
          !task.when?.includes(daysOfWeek[today.getDay()]) &&
          task.when?.length > 3 &&
          new Date(new Date(task.when).setHours(0, 0, 0, 0)) <= new Date()
        ) {
          task.canBeRepeated = false;
          delete task.when;
          dataCopy = updateTaskPriority(dataCopy, category._id, task.name, 1);
          hasChanges = true;
        }

        // Clean up empty 'when' properties
        if (Object.keys(task).includes("when") && task.when === "") {
          delete task.when;
          hasChanges = true;
        }
      }

      // If we made changes to tasks, restart from the beginning
      if (hasChanges) break;
    }

    // If no task changes were made, check category statuses
    if (!hasChanges) {
      for (
        let categoryIndex = 0;
        categoryIndex < dataCopy.length;
        categoryIndex++
      ) {
        const category = dataCopy[categoryIndex];
        if (!category) continue; // Category might have been deleted

        let statusNeedsToBeUpdated = categoryStatusNeedsUpdate(category);
        if (statusNeedsToBeUpdated) {
          dataCopy = toggleCategoryDoneStatus(
            dataCopy,
            category,
            !category.isMarkedDone
          );
          hasChanges = true;
          break; // Restart processing from the beginning
        }

        let hasRepeatableTasks = category.tasks.some(
          (task) => task.canBeRepeated
        );
        if (!hasRepeatableTasks && category.isMarkedDone) {
          dataCopy = deleteCategoryById(dataCopy, category._id);
          hasChanges = true;
          break; // Restart processing from the beginning
        }
      }
    }

    // Double-check if any changes were actually made by comparing the data
    if (!hasChanges) {
      const finalDataCopyString = JSON.stringify(dataCopy);
      hasChanges = initialDataCopyString !== finalDataCopyString;
    }
  }

  return dataCopy;
}

// Export both the main function and the daysOfWeek array
module.exports = chron;
