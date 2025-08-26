import React from 'react';

const Journal = ({ active, scenes, addScene, removeScene, updateScene }) => {
  const handleTitleChange = (id, value) => {
    updateScene(id, 'title', value);
  };

  const handleContentChange = (id, value) => {
    updateScene(id, 'content', value);
  };

  return (
    <div id="journal" className={`tabcontent ${active ? 'active' : ''}`}>
      <div id="scene-window">
        {scenes.map((scene) => (
          <div key={scene.id} className="scene-box">
            <input
              type="text"
              placeholder="scene#"
              maxLength="15"
              size="5"
              value={scene.title}
              onChange={(e) => handleTitleChange(scene.id, e.target.value)}
            />
            <textarea
              placeholder="scene text ..."
              value={scene.content}
              onChange={(e) => handleContentChange(scene.id, e.target.value)}
            />
            <span 
              className="scene-close"
              onClick={() => removeScene(scene.id)}
            >
              &#215;
            </span>
          </div>
        ))}
      </div>
      
      <div id="scene-bottom-row" className="bottom-row">
        <div className="fate-qs">
          <button id="add-scene-btn" onClick={addScene}>
            Add scene
          </button>
        </div>
      </div>
    </div>
  );
};

export default Journal;