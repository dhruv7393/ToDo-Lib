const getNumberOfCategoriesMarkedDone = (categories) => {
  return categories.filter((cat) => cat.isMarkedDone).length;
};

const getNumberOfCategoriesMarkedNotDone = (categories) => {
  return categories.filter((cat) => !cat.isMarkedDone).length;
};

const categoryStatusNeedsUpdate = (currentCategory) => {
  let allDoneTasks = currentCategory.tasks.filter((task) => task.done).length;
  let totalTasks = currentCategory.tasks.length;
  return currentCategory.isMarkedDone !== (allDoneTasks === totalTasks);
};

const taskStatusNeedsUpdate = (currentTask, newStatus) => {
  return currentTask.done !== newStatus;
};

const indexOfCategoryById = (data, _id) => {
  return data.findIndex((cat) => cat._id === _id);
};

const getCurrentCategory = (data, _id) => {
  return JSON.parse(JSON.stringify(data.find((cat) => cat._id === _id)));
};

const getCurrentTask = (category, name) => {
  return JSON.parse(
    JSON.stringify(category.tasks.find((task) => task.name === name))
  );
};

const toggleTaskDoneStatus = (category, name, status) => {
  const currentTask = getCurrentTask(category, name);
  let tasksFromPriority = JSON.parse(JSON.stringify(category.tasks));
  if (currentTask && taskStatusNeedsUpdate(currentTask, status)) {
    let currentTaskPriority = currentTask.priority;
    tasksFromPriority = tasksFromPriority.map((task) => {
      if (task.name === name) {
        task.done = status;
        task.priority = status
          ? tasksFromPriority.length
          : category.notDone + 1;
      } else if (task.priority > currentTaskPriority && status) {
        task.priority -= 1; // Shift up tasks below
      } else if (
        task.priority > category.notDone &&
        task.priority < currentTaskPriority &&
        !status
      ) {
        task.priority += 1; // Shift up tasks below
      }
      return task;
    });
    return {
      ...category,
      done: category.done + (status ? 1 : -1),
      notDone: category.notDone - (status ? 1 : -1),
      tasks: tasksFromPriority,
    };
  }
  return category; // No change needed
};

const toggleCategoryDoneStatus = (
  data,
  category,
  status,
  toggleAlltask = false
) => {
  let dataCopy = JSON.parse(JSON.stringify(data));
  let categoriesNotDone = getNumberOfCategoriesMarkedNotDone(data);
  let currentCategory = getCurrentCategory(dataCopy, category._id);
  if (currentCategory && currentCategory.isMarkedDone !== status) {
    let currentCategoryPriority = currentCategory.priority;
    dataCopy = dataCopy.map((cat) => {
      if (cat._id === category._id) {
        cat.isMarkedDone = status;
        cat.priority = status ? dataCopy.length : categoriesNotDone + 1;
        if (toggleAlltask) {
          cat.tasks = cat.tasks.map((task) => ({
            ...task,
            done: status,
          }));
          cat.done = status ? cat.tasks.length : 0;
          cat.notDone = status ? 0 : cat.tasks.length;
        }
      } else if (cat.priority > currentCategoryPriority && status) {
        cat.priority -= 1; // Shift up categories below
      } else if (
        cat.priority > categoriesNotDone &&
        cat.priority < currentCategoryPriority &&
        !status
      ) {
        cat.priority += 1; // Shift up categories below
      }
      return cat;
    });
    return dataCopy;
  }
  return dataCopy; // No change needed
};

const deleteCategory = (data, _id) => {
  let dataCopy = JSON.parse(JSON.stringify(data));
  let currentCategory = getCurrentCategory(dataCopy, _id);
  if (currentCategory) {
    const currentCategoryPriority = currentCategory.priority;
    dataCopy = dataCopy
      .filter((cat) => cat._id !== _id)
      .map((cat) => {
        if (cat.priority > currentCategoryPriority) {
          cat.priority -= 1; // Shift up categories below
        }
        return cat;
      });
    return dataCopy;
  }
  return dataCopy; // No change needed
};

const deleteTaskByName = (data, _id, name) => {
  let dataCopy = JSON.parse(JSON.stringify(data));
  let currentCategory = getCurrentCategory(dataCopy, _id);
  let currentCategoryIndex = indexOfCategoryById(dataCopy, _id);
  if (currentCategory) {
    let currentTask = getCurrentTask(currentCategory, name);
    if (currentTask) {
      let currentTaskPriority = currentTask.priority;
      let listOfTasks = currentCategory.tasks
        .filter((task) => task.name !== name)
        .map((task) => {
          if (task.priority > currentTaskPriority) {
            task.priority -= 1; // Shift up categories below
          }
          return task;
        });
      currentCategory.tasks = listOfTasks;
      dataCopy[currentCategoryIndex] = {
        ...currentCategory,
        tasks: listOfTasks,
        done: currentCategory.done - (currentTask.done ? 1 : 0),
        notDone: currentCategory.notDone - (currentTask.done ? 0 : 1),
        total: listOfTasks.length,
      };
    }
    return dataCopy;
  }
  return dataCopy; // No change needed
};

module.exports = {
  getNumberOfCategoriesMarkedDone,
  getNumberOfCategoriesMarkedNotDone,
  categoryStatusNeedsUpdate,
  taskStatusNeedsUpdate,
  indexOfCategoryById,
  getCurrentCategory,
  getCurrentTask,
  toggleTaskDoneStatus,
  toggleCategoryDoneStatus,
  deleteCategory,
  deleteTaskByName,
};
