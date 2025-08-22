const deleteTask = require("./deleteTask");
const deleteCategoryById = require("./deleteCategoryById");
const updateTask = require("./UpdateTask");
const getModifiedCategories = require("./modifiedCategories");
const sortToDos = require("./sortData");

// Array of days of week starting from Monday
const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

/**
 * Processes recurring tasks and cleans up completed non-repeatable tasks.
 * @param {Array} data - The array of category objects.
 * @returns {Object} - Object containing updated data and deleted category IDs.
 */
function chron(data) {
  // Make a deep copy of data
  let dataCopy = JSON.parse(JSON.stringify(data));
  const deletedCategories = [];

  const today = new Date();
  const todayDateString = today.toLocaleDateString();
  const todayDayOfWeek =
    daysOfWeek[today.getDay() === 0 ? 6 : today.getDay() - 1]; // Adjust for Monday start
  const todayDate = today.getDate();

  // Iterate over all categories
  for (let i = dataCopy.length - 1; i >= 0; i--) {
    const category = dataCopy[i];

    // Iterate over all tasks in each category
    for (let j = category.tasks.length - 1; j >= 0; j--) {
      const task = category.tasks[j];

      // If task is done and canBeRepeated is false, delete task
      if (task.done && !task.canBeRepeated) {
        dataCopy = deleteTask(dataCopy, category._id, task.name);
        continue;
      }

      // Process tasks with when property
      if (task.when) {
        // If when is equal to today's date string, remove when from task
        if (task.when === todayDateString) {
          dataCopy = updateTask(dataCopy, category._id, task.name, {
            when: "",
          });
        }

        // If when has a substring of today's day of week, set done as false
        if (task.when.includes(todayDayOfWeek)) {
          dataCopy = updateTask(dataCopy, category._id, task.name, {
            done: false,
          });
        }

        // If when is equal to today's date number, set done as false
        if (task.when === todayDate.toString()) {
          dataCopy = updateTask(dataCopy, category._id, task.name, {
            done: false,
          });
        }
      }
    }

    // Check if category has no tasks and delete if empty
    const updatedCategory = dataCopy.find((cat) => cat._id === category._id);
    if (updatedCategory && updatedCategory.tasks.length === 0) {
      deletedCategories.push(updatedCategory._id);
      dataCopy = deleteCategoryById(dataCopy, updatedCategory._id);
    }
  }

  // Return final object with updated data and deleted categories
  return {
    update: getModifiedCategories(sortToDos(data), sortToDos(dataCopy)),
    delete: deletedCategories,
  };
}

// Export both the main function and the daysOfWeek array
module.exports = chron;
module.exports.daysOfWeek = daysOfWeek;
