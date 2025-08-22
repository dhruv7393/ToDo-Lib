const updateCategoryPriority = require("./updateCategoryPriority");
const sortToDos = require("./sortData");

/**
 * Deletes a category by its ID.
 * @param {Array} data - The array of category objects.
 * @param {string} _id - The _id of the category to delete.
 * @returns {Array} - The updated array of categories with the specified category removed.
 */
const deleteCategoryById = (data, _id) => {
  // Make a deep copy of data to avoid mutation
  const dataCopy = JSON.parse(JSON.stringify(data));

  // Find the category to delete
  const categoryIdx = dataCopy.findIndex((cat) => cat._id === _id);
  if (categoryIdx === -1) return sortToDos(dataCopy);

  // Move the category to last position using updateCategoryPriority
  const lastPriority = dataCopy.length;
  const updatedData = updateCategoryPriority(dataCopy, _id, lastPriority);

  // Remove the category from the list (it should now be at the end)
  const finalCategoryIdx = updatedData.findIndex((cat) => cat._id === _id);
  updatedData.splice(finalCategoryIdx, 1);

  // Use sortToDos on the data being returned
  return sortToDos(updatedData);
};

module.exports = deleteCategoryById;
