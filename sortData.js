const sortByPriority = (data) => {
  return data.sort((a, b) => {
    if (a.priority === b.priority) {
      return a.name.localeCompare(b.name);
    }
    return a.priority - b.priority;
  });
};

// Sort categories and their tasks by priority
const sortToDos = (data) => {
  const dataCopy = JSON.parse(JSON.stringify(data));
  const sortedCategories = sortByPriority(dataCopy);
  const sortedTasksWithCategories = sortedCategories.map((category) => {
    const { tasks, ...categoryDetails } = category;
    const toDoList = { ...categoryDetails, tasks: sortByPriority(tasks) };
    return toDoList;
  });
  return sortedTasksWithCategories;
};

module.exports = sortToDos;
