import React from 'react';
import Oracle from './Oracle';
import Journal from './Journal';
import Lists from './Lists';

const Emulator = ({
  activeTab,
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
  generateAnswer,
  npcArray,
  threadArray,
  addCharacter,
  removeCharacter,
  addThread,
  removeThread,
  scenes,
  addScene,
  removeScene,
  updateScene
}) => {
  return (
    <section id="emulator">
      <div id="emulator-window">
        {/* Oracle tab content */}
        <Oracle
          active={activeTab === 'oracle'}
          chaosNumber={chaosNumber}
          adjustChaos={adjustChaos}
          displayText={displayText}
          clearDisplay={clearDisplay}
          handleSceneStart={handleSceneStart}
          handleQuestion={handleQuestion}
          handleEvent={handleEvent}
          showOddsModal={showOddsModal}
          setShowOddsModal={setShowOddsModal}
          slideIndex={slideIndex}
          adjustSlide={adjustSlide}
          oddsValues={oddsValues}
          generateAnswer={generateAnswer}
        />

        {/* Journal tab content */}
        <Journal
          active={activeTab === 'journal'}
          scenes={scenes}
          addScene={addScene}
          removeScene={removeScene}
          updateScene={updateScene}
        />

        {/* Lists tab content */}
        <Lists
          active={activeTab === 'list'}
          npcArray={npcArray}
          threadArray={threadArray}
          addCharacter={addCharacter}
          removeCharacter={removeCharacter}
          addThread={addThread}
          removeThread={removeThread}
        />
      </div>
    </section>
  );
};

export default Emulator;