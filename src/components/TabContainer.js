import React from 'react';

const TabContainer = ({ activeTab, openTab }) => {
  return (
    <div id="tab-container">
      {/* tab links */}
      <div className="tab">
        <button 
          id="list-button" 
          className={`tablink ${activeTab === 'list' ? 'active' : ''}`}
          onClick={() => openTab('list')}
        >
          Threads
        </button>
        <button 
          id="journal-button" 
          className={`tablink ${activeTab === 'journal' ? 'active' : ''}`}
          onClick={() => openTab('journal')}
        >
          Scenes
        </button>
        <button 
          id="oracle-button" 
          className={`tablink ${activeTab === 'oracle' ? 'active' : ''}`}
          onClick={() => openTab('oracle')}
        >
          Oracle
        </button>
      </div>
    </div>
  );
};

export default TabContainer;