import React, { useState, useEffect } from 'react';
import './App.css';
import {BsXLg } from 'react-icons/bs';

// Component:
function AlarmClocks() {
  // UseState Hooks:
  const [allAlarms, setAlarms] = useState([]);
  const [newAlarmTime, setNewAlarmTime] = useState('');
  const [newAlarmDescription, setNewAlarmDescription] = useState('');

  // Note:
  // ***Storage\local storage means browser's local storage***

   // Add a new alarm to allAlarms array through hook and storage the updated array:
  const handleAddAlarm = () => {
    const newAlarm = {
      time: newAlarmTime,
      description: newAlarmDescription,
    };

    const updatedAlarmArr = [...allAlarms];
    updatedAlarmArr.push(newAlarm);
    setAlarms(updatedAlarmArr);
    localStorage.setItem('alarms', JSON.stringify(updatedAlarmArr)); // Stringify the array to json
  };

  // Delete an existing alarm, storage the updated array and update the array through hook:
  const handleDeleteAlarm = (index) => {
    const reducedAlarms = [...allAlarms];
    reducedAlarms.splice(index, 1);

    localStorage.setItem('alarms', JSON.stringify(reducedAlarms));
    setAlarms(reducedAlarms);
  };

  // Fetch the data from storage after the component(AlarmsClocks) has rendered using useEffect hook:
  useEffect(() => {
    const savedAlarms = JSON.parse(localStorage.getItem('alarms')) || []; // Parse back the array from json

    setAlarms(savedAlarms);
  }, []); // [] -> Run only once after the initial rendering of the component(AlarmClocks)

  

  return (
    <div>
      <h1>My Alarm Clocks</h1>

      <div className="task-wrapper">
        <div className="task-input">
            <div className="task-input-item">
            <label>Time</label>
            <input type="time" value={newAlarmTime} onChange={(e) => setNewAlarmTime(e.target.value)} />
            </div>
            <div className="task-input-item">
            <label>Description</label>
            <input type="text" value={newAlarmDescription} onChange={(e) => setNewAlarmDescription(e.target.value)} placeholder="Alarm description" />
            </div>
            <div className="task-input-item">
            <button type="button" onClick={handleAddAlarm} className="primaryBtn">
                Add Alarm
            </button>
            </div>
        </div>

        {/* List of alarms */}
        <div className="task-list">
            {allAlarms.map((alarm, index) => (
            <div className="task-list-item" key={index}>
                <div>
                <p>{`Time: ${alarm.time}, Description: ${alarm.description}`}</p>
                </div>
                <div>
                <BsXLg onClick={() => handleDeleteAlarm(index)} className="delete-icon" />
                </div>
            </div>
            ))}
        </div>
       </div>
    </div>
  );
}

export default AlarmClocks;
