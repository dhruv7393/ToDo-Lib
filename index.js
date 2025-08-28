// Import all modules
const sortByKey = require("./sort");
const sortToDos = require("./sortData");
const addTask = require("./addTask");
const deleteTask = require("./deleteTask");
const updateTask = require("./UpdateTask");
const toggleTaskDone = require("./toggleTaskDone");
const updateTaskPriority = require("./updateTaskPriority");
const addCategory = require("./addCategory");
const deleteCategoryById = require("./deleteCategoryById");
const toggleCategoryDone = require("./toggleCategoryDone");
const updateCategoryPriority = require("./updateCategoryPriority");
const getModifiedCategories = require("./modifiedCategories");
const chron = require("./chron");
const { daysOfWeek } = require("./chron");
const {
  getNumberOfCategoriesMarkedDone,
  getNumberOfCategoriesMarkedNotDone,
  categoryStatusNeedsUpdate,
  taskStatusNeedsUpdate,
  indexOfCategoryById,
  getCurrentCategory,
  getCurrentTask,
  toggleTaskDoneStatus,
  toggleCategoryDoneStatus,
} = require("./utils");

// Export all modules
module.exports = {
  // Core sorting utility (main export)
  sortByKey,

  // Task management functions
  addTask,
  deleteTask,
  updateTask,
  toggleTaskDone,
  updateTaskPriority,

  // Category management functions
  addCategory,
  deleteCategoryById,
  toggleCategoryDone,
  updateCategoryPriority,

  // Data utilities
  sortToDos,
  getModifiedCategories,
  chron,
  daysOfWeek,

  getNumberOfCategoriesMarkedDone,
  getNumberOfCategoriesMarkedNotDone,
  categoryStatusNeedsUpdate,
  taskStatusNeedsUpdate,
  indexOfCategoryById,
  getCurrentCategory,
  getCurrentTask,
  toggleTaskDoneStatus,
  toggleCategoryDoneStatus,

  // Default export for backward compatibility
  default: sortByKey,
};
