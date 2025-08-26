import React, { useState } from 'react';

const Lists = ({
  active,
  npcArray,
  threadArray,
  addCharacter,
  removeCharacter,
  addThread,
  removeThread
}) => {
  const [charInput, setCharInput] = useState('');
  const [threadInput, setThreadInput] = useState('');

  const handleCharacterSubmit = (e) => {
    e.preventDefault();
    addCharacter(charInput);
    setCharInput('');
  };

  const handleThreadSubmit = (e) => {
    e.preventDefault();
    addThread(threadInput);
    setThreadInput('');
  };

  const handleCharKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCharacterSubmit(e);
    }
  };

  const handleThreadKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleThreadSubmit(e);
    }
  };

  return (
    <div id="list" className={`tabcontent ${active ? 'active' : ''}`}>
      <div id="list-container">
        {/* Characters lists */}
        <div id="characters">
          <h2 className="header">characters & groups</h2>
          <input
            id="char-input"
            type="text"
            placeholder="Add character..."
            value={charInput}
            onChange={(e) => setCharInput(e.target.value)}
            onKeyDown={handleCharKeyDown}
          />
          <button
            aria-label="add character or group"
            id="character-btn"
            className="addBtn"
            onClick={handleCharacterSubmit}
          >
            <i className="fas fa-plus-circle"></i>
          </button>
          <ul id="char-ul">
            {npcArray.map((character, index) => (
              <li key={index}>
                {character}
                <span
                  className="close"
                  onClick={() => removeCharacter(index)}
                >
                  &#215;
                </span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Threads lists */}
        <div id="threads">
          <h2 className="header">Threads</h2>
          <input
            id="thread-input"
            type="text"
            placeholder="Add thread.."
            value={threadInput}
            onChange={(e) => setThreadInput(e.target.value)}
            onKeyDown={handleThreadKeyDown}
            required
          />
          <button
            aria-label="add thread"
            id="thread-btn"
            className="addBtn"
            onClick={handleThreadSubmit}
          >
            <i className="fas fa-plus-circle"></i>
          </button>
          <ul id="thread-ul">
            {threadArray.map((thread, index) => (
              <li key={index}>
                {thread}
                <span
                  className="close"
                  onClick={() => removeThread(index)}
                >
                  &#215;
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Lists;