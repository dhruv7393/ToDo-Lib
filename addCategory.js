const sortToDos = require("./sortData");

/**
 * Adds a new category to the data.
 * @param {Array} data - The array of category objects.
 * @param {string} name - The name of the new category.
 * @param {string} color - The color of the new category.
 * @returns {Array} - The updated array of categories with the new category added.
 */
const addCategory = (data, _id, name, color) => {
  // Create a deep copy of data to avoid mutation, ensure it's an array
  const dataCopy = Array.isArray(data) ? JSON.parse(JSON.stringify(data)) : [];

  // Find max priority of not done categories
  const notDoneCategories = dataCopy.length
    ? dataCopy.filter((cat) => !cat.isMarkedDone)
    : [];
  let newPriority;

  if (notDoneCategories.length === 0) {
    // No not done categories, set priority to 1
    newPriority = 1;
  } else {
    const maxNotDonePriority = Math.max(
      ...notDoneCategories.map((cat) => cat.priority)
    );
    newPriority = maxNotDonePriority + 1;
  }

  // Update priority of done categories with +1
  dataCopy.length &&
    dataCopy.forEach((cat) => {
      if (cat.isMarkedDone) {
        cat.priority += 1;
      }
    });

  // Create the new category object
  const newCategory = {
    _id: _id,
    name: name,
    color: color,
    priority: newPriority,
    done: 0,
    notDone: 0,
    total: 0,
    isMarkedDone: false,
    tasks: [],
  };

  // Add the new category to the data
  dataCopy.push(newCategory);

  // Use sortToDos and return the data
  return sortToDos(dataCopy);
};

module.exports = addCategory;
