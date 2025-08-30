const deleteTask = require("./deleteTask");
const deleteCategoryById = require("./deleteCategoryById");
const updateTask = require("./UpdateTask");
const getModifiedCategories = require("./modifiedCategories");
const sortToDos = require("./sortData");
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
  const today = new Date();
  const todaysDate = today.toLocaleDateString();
  let possibleWhenValues = [
    today.getDate().toString(),
    daysOfWeek[today.getDay() === 0 ? 6 : today.getDay() - 1],
  ];

  dataCopy.forEach((category) => {
    const { tasks } = category;
    tasks.forEach((task) => {
      if (task.done && !task.canBeRepeated) {
        dataCopy = deleteTaskByName(dataCopy, category._id, task.name);
      }
      if (
        task.done &&
        task.canBeRepeated &&
        possibleWhenValues.some((val) => task.when?.includes(val))
      ) {
        dataCopy = toggleTaskDone(dataCopy, category._id, task.name, false);
      }
      if (Object.keys(task).includes("when") && task.when === todaysDate) {
        task.canBeRepeated = false;
        delete task.when;
      }
    });
  });

  dataCopy.forEach((category) => {
    let statusNeedsToBeUpdated = categoryStatusNeedsUpdate(category);
    let newStatus = !category.isMarkedDone;
    let hasRepeatableTasks = category.tasks.some((task) => task.canBeRepeated);
    if (statusNeedsToBeUpdated) {
      dataCopy = toggleCategoryDoneStatus(
        dataCopy,
        category,
        !category.isMarkedDone
      );
      if (statusNeedsToBeUpdated && newStatus && !hasRepeatableTasks) {
        dataCopy = deleteCategoryById(dataCopy, category._id);
      }
    }
  });

  return dataCopy;
}

// Export both the main function and the daysOfWeek array
module.exports = chron;
