import React, { useState, useEffect } from 'react';
import Tasks from './Tasks';
import AlarmClocks from './AlarmClocks';
import './App.css';

function App() {
  // State for managing active tab
  const [activeTab, setActiveTab] = useState('tasks');

  return (
    <div className="App">
      <div className="btn-tabs-area">
        <button className={`secondaryBtn ${activeTab === 'tasks' && 'active'}`} onClick={() => setActiveTab('tasks')}>
          Tasks
        </button>
        <button className={`secondaryBtn ${activeTab === 'alarms' && 'active'}`} onClick={() => setActiveTab('alarms')}>
          Alarms
        </button>
      </div>

      {activeTab === 'tasks' ? (
        <Tasks />
      ) : (
        <AlarmClocks />
      )}
    </div>
  );
}

export default App;
