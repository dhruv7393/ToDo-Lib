/**
 * Compares original and updated ToDo data and returns categories that have been modified
 * @param {Array} originalData - Original array of categories from ToDoMock
 * @param {Array} updatedData - Updated array of categories
 * @returns {Array} Array of entire modified category objects
 */
function getModifiedCategories(originalData, updatedData) {
  const maxLength = Math.max(originalData.length, updatedData.length);
  const indices = Array.from({ length: maxLength }, (_, i) => i);

  const modifiedCategories = indices.map((index) => {
    const originalCategory = originalData[index];
    const updatedCategory = updatedData[index];

    // Check if the categories are different
    if (
      !originalCategory ||
      JSON.stringify(originalCategory) !== JSON.stringify(updatedCategory)
    ) {
      return updatedCategory; // Return the updated category
    }
  });
  return modifiedCategories.filter(
    (category) => typeof category !== "undefined"
  );
}

// Export the function
module.exports = getModifiedCategories;
