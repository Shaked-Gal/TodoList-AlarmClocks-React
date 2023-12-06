import React, { useEffect, useState } from 'react';
import { BsCheckLg, BsXLg } from 'react-icons/bs';
import './App.css';

// Component:
function App() {
  // UseState Hooks:
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [completedTasks, setCompletedTasks] = useState([]);

  // Note:
  // ***Storage\local storage means browser's local storage***

  // Add a new task to allTasks array through hook and storage the updated array:
  const handleAddTask = () => {
    let newTaskItem = {
      task: newTask,
      description: newDescription,
    };

    let updatedTaskArr = [...allTasks];
    updatedTaskArr.push(newTaskItem);
    setTasks(updatedTaskArr);
    localStorage.setItem('toBeCompletedTasks', JSON.stringify(updatedTaskArr)); // Stringify the array to json
  };

  // Add an existing task to completedTasks array through hook and storage the updated array:
  const handleCompletedTask = (index) => {
    completedTasks.push(allTasks[index]);
    setCompletedTasks([...completedTasks]);
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks)); // Stringify the array to json

    // Delete from allTasks array:
    handleDeleteTask(index);
  };

  // Delete an existing completed task, storage the updated array and update the array through hook:
  const handleDeleteCompletedTask = (index) => {
    let reducedCompletedTasks = [...completedTasks];
    reducedCompletedTasks.splice(index, 1);

    localStorage.setItem('completedTasks', JSON.stringify(reducedCompletedTasks)); // Stringify the array to json
    setCompletedTasks(reducedCompletedTasks);
  };

  // Delete an existing task, storage the updated array and update the array through hook:
  const handleDeleteTask = (index) => {
    let reducedTasks = [...allTasks];
    reducedTasks.splice(index, 1);

    localStorage.setItem('toBeCompletedTasks', JSON.stringify(reducedTasks)); // Stringify the array to json
    setTasks(reducedTasks);
  };

  // Fetch the data from storage after the component(App) has rendered using useEffect hook:
  useEffect(() => {
    let savedTasks = JSON.parse(localStorage.getItem('toBeCompletedTasks')); // Parse back the array from json
    let savedCompletedTasks = JSON.parse(localStorage.getItem('completedTasks')); // Parse back the array from json

    // If there are tasks stored in the storage, set the state using them:
    if (savedTasks) {
      setTasks(savedTasks);
    }
    // If there are tasks stored in the storage, set the state using them:
    if (savedCompletedTasks) {
      setCompletedTasks(savedCompletedTasks);
    }
  }, []); // [] -> Run only once after the initial rendering of the component(App)

  return (
    <div className="App">
      <h1>My Tasks</h1>

      <div className="task-wrapper">
        <div className="task-input">

          <div className="task-input-item">
            <label>Task</label>
            <input type="text" value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder="What's the task?"/>
          </div>
          <div className="task-input-item">
            <label>Description</label>
            <input type="text" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} placeholder="What's the description?"/>
          </div>
          <div className="task-input-item">
            <button type="button" onClick={handleAddTask} className="primaryBtn">
              Add
            </button>
          </div>

        </div>

        <div className="btn-area">

          <button className={`secondaryBtn ${isCompleteScreen === false && 'active'}`} onClick={() => setIsCompleteScreen(false)}>
            Tasks
          </button>
          <button className={`secondaryBtn ${isCompleteScreen === true && 'active'}`} onClick={() => setIsCompleteScreen(true)}
          >
            Completed
          </button>

        </div>

        <div className="task-list">
          {isCompleteScreen
            ? // If isCompleteScreen is true -> show completed tasks:
              completedTasks.map((item, index) => (
                <div className="task-list-item" key={index}>
                  <div>
                    <h3>{item.task}</h3>
                    <p>{item.description}</p>
                  </div>
                  <div>
                    <BsXLg onClick={() => handleDeleteCompletedTask(index)} className="delete-icon" />
                  </div>
                </div>
              ))
            : // If isCompleteScreen is false -> show all tasks:
              allTasks.map((item, index) => (
                <div className="task-list-item" key={index}>
                  <div>
                    <h3>{item.task}</h3>
                    <p>{item.description}</p>
                  </div>
                  <div>
                    <BsXLg onClick={() => handleDeleteTask(index)} className="delete-icon" />
                    <BsCheckLg onClick={() => handleCompletedTask(index)} className="check-icon" />
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}

export default App;
