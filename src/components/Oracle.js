import React from 'react';

const Oracle = ({
  active,
  chaosNumber,
  adjustChaos,
  displayText,
  clearDisplay,
  handleSceneStart,
  handleQuestion,
  handleEvent,
  showOddsModal,
  setShowOddsModal,
  slideIndex,
  adjustSlide,
  oddsValues,
  generateAnswer
}) => {
  // Handle clicking outside modal to close it
  const handleModalBackgroundClick = (e) => {
    if (e.target.classList.contains('odds-modal')) {
      setShowOddsModal(false);
    }
  };

  return (
    <div id="oracle" className={`tabcontent ${active ? 'active' : ''}`}>
      <div id="chaos">
        <h2 id="chaos-txt" className={chaosNumber === 9 ? 'chaos-red' : ''}>
          Chaos
        </h2>
        <h3 id="chaos-number" className={chaosNumber === 9 ? 'chaos-red' : ''}>
          {chaosNumber}
        </h3>
        <button 
          aria-label="previous" 
          id="chaos-prev"
          onClick={() => adjustChaos('prev')}
        >
          &#10094;
        </button>
        <button 
          aria-label="next" 
          id="chaos-next"
          onClick={() => adjustChaos('next')}
        >
          &#10095;
        </button>
      </div>
      
      <div id="text-window">
        {/* Odds Modal */}
        <div 
          id="odds-modal" 
          className={`odds-modal ${showOddsModal ? 'show' : ''}`}
          onClick={handleModalBackgroundClick}
        >
          <h3 id="odds-header">Set odds of yes answer</h3>
          <div id="odds-container">
            {oddsValues.map((value, index) => (
              <div 
                key={index}
                className={`odds-slider ${slideIndex === index + 1 ? 'active' : ''}`}
              >
                <div className="odds-value">{value}</div>
              </div>
            ))}
            
            {/* Next and previous buttons */}
            <button 
              aria-label="previous odds value" 
              className="prev" 
              onClick={() => adjustSlide('prev')}
            >
              &#10094;
            </button>
            <button 
              aria-label="next odds value" 
              className="next" 
              onClick={() => adjustSlide('next')}
            >
              &#10095;
            </button>
          </div>
          
          {/* Modal close/submit button */}
          <div id="set-odds">
            <button 
              aria-label="submit odds selection" 
              id="set-odds-button"
              onClick={generateAnswer}
            >
              <i className="fas fa-check-circle"></i>
            </button>
          </div>
        </div>
        
        <div className="buffer"></div>
        <div 
          id="text-display"
          dangerouslySetInnerHTML={{ __html: displayText }}
        >
        </div>
      </div>
      
      {/* Emulator window bottom row of buttons */}
      <div className="bottom-row">
        <div className="fate-qs">
          <button id="scene-btn" onClick={handleSceneStart}>
            start scene
          </button>
        </div>
        <div className="fate-qs">
          <button id="question-btn" onClick={handleQuestion}>
            question
          </button>
        </div>
        <div className="fate-qs">
          <button id="event-btn" onClick={handleEvent}>
            Event
          </button>
        </div>
      </div>
    </div>
  );
};

export default Oracle;