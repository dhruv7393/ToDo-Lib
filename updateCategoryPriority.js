const sortToDos = require("./sortData");

/**
 * Helper function to update category priority without triggering file write
 * @param {Array} categories - The array of category objects (already cloned)
 * @param {string} _id - The _id of the category to update
 * @param {number} newPriority - The new priority to set
 * @returns {Array} - The updated array of categories
 */
const updateCategoryPriorityHelper = (categories, _id, newPriority) => {
  const idx = categories.findIndex((cat) => cat._id === _id);
  if (idx === -1) return categories;

  const oldPriority = categories[idx].priority;
  if (newPriority < oldPriority) {
    // Increase priority of categories between new and old priority by 1
    categories.forEach((cat) => {
      if (
        cat._id !== _id &&
        cat.priority >= newPriority &&
        cat.priority < oldPriority
      ) {
        cat.priority += 1;
      }
    });
  } else if (newPriority > oldPriority) {
    // Decrease priority of categories between old and new priority by 1
    categories.forEach((cat) => {
      if (
        cat._id !== _id &&
        cat.priority > oldPriority &&
        cat.priority <= newPriority
      ) {
        cat.priority -= 1;
      }
    });
  }
  // Set current category priority to newPriority
  categories[idx].priority = newPriority;

  return categories;
};

/**
 * Updates the priority of a category and rearranges priorities accordingly.
 * @param {Array} data - The array of category objects.
 * @param {string} _id - The _id of the category to update.
 * @param {number} newPriority - The new priority to set.
 * @returns {Array} - The updated array of categories.
 */
const updateCategoryPriority = (data, _id, newPriority) => {
  const dataCopy = JSON.parse(JSON.stringify(data));
  // Clone data to avoid mutation
  const categories = [...dataCopy];

  // Use helper function to update priorities
  const updatedCategories = updateCategoryPriorityHelper(
    categories,
    _id,
    newPriority
  );

  // Use sortToDos to rearrange the categories and their tasks
  return sortToDos(updatedCategories);
};

module.exports = updateCategoryPriority;
