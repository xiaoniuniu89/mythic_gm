import React, { useState, useRef, useEffect } from 'react';
import Header from './components/Header';
import TabContainer from './components/TabContainer';
import Emulator from './components/Emulator';
import Footer from './components/Footer';

// Constants from original script
const eventFocus = [
  'Remote event', 'Introduce a new NPC', 'PC negative', 'PC positive', 'Ambiguous event',
  'NPC negative', 'NPC positive', 'NPC action', 'Move toward a thread', 'Move away from a thread', 'Close a thread'
];

const eventAction = [
  "Attainment","Starting","Neglect","Fight","Recruit","Triumph","Violate","Oppose","Malice","Communicate",
  "Persecute","Increase","Decrease","Abandon","Gratify","Inquire","Antagonise","Move","Waste","Truce","Release","Befriend",
  "Judge","Desert","Dominate","Procrastinate","Praise","Separate","Take","Break","Heal",
  "Delay","Stop","Lie","Return","Immitate","Struggle","Inform","Bestow","Postpone","Expose","Haggle","Imprison","Release","Celebrate","Develop",
  "Travel","Block","Harm","Debase","Overindulge","Adjourn","Adversity","Kill","Disrupt","Usurp","Create","Betray","Agree","Abuse",
  "Oppress","Inspect","Ambush","Spy","Attach","Carry","Open","Carelessness","Ruin","Extravagance","Trick","Arrive","Propose","Divide",
  "Refuse","Mistrust","Deceive","Cruelty","Intolerance","Trust","Excitement","Activity","Assist","Care","Negligence","Passion",
  "Work hard","Control","Attract","Failure","Pursue","Vengeance","Proceedings","Dispute","Punish","Guide","Transform",
  "Overthrow","Oppress","Change"
];

const eventSubject = [
  "Goals", "Dreams", "Environment", "Outside", "Inside","Reality",
  "Allies","Enemies","Evil","Good","Emotions","Opposition","War","Peace","The innocent","Love","The spiritual",
  "The intellectual","New ideas","Joy","Messages","Energy","Balance","Tension","Friendship","The physical","A project","Pleasures",
  "Pain","Possessions","Benefits","Plans","Lies","Expectations","Legal matters","Bureaucracy","Business",
  "A path","News","Exterior factors","Advice","A plot","Competition","Prison","Illness","Food","Attention","Success","Failure","Travel",
  "Jealousy","Dispute","Home","Investment","Suffering","Wishes","Tactics","Stalemate","Randomness","Misfortune","Death",
  "Disruption","Power","A burden","Intrigues","Fears","Ambush","Rumor","Wounds","Extravagance","A representative","Adversities",
  "Opulence","Liberty","Military","The mundane","Trials","Masses","Vehicle","Art","Victory","Dispute","Riches","Status quo",
  "Technology","Hope","Magic","Illusions","Portals","Danger","Weapons","Animals","Weather","Elements","Nature","The public","Leadership","Fame",
  "Anger","Information"
];

function App() {
  // Core state
  const [activeTab, setActiveTab] = useState('oracle');
  const [chaosNumber, setChaosNumber] = useState(5);
  const [displayText, setDisplayText] = useState('');
  const [showHowToModal, setShowHowToModal] = useState(false);
  const [showOddsModal, setShowOddsModal] = useState(false);
  const [slideIndex, setSlideIndex] = useState(1);
  
  // Lists state
  const [npcArray, setNpcArray] = useState([]);
  const [threadArray, setThreadArray] = useState([]);
  const [scenes, setScenes] = useState([]);

  // Odds values for fate chart
  const oddsValues = [
    "50/50", "Somewhat likely", "Likely", "Very likely", "Near sure thing", 
    "A sure thing", "Has to be", "Impossible", "Very unlikely", "Unlikely"
  ];

  // Fate chart odds arrays
  const oddsArrays = {
    "50/50": [10, 15, 25, 35, 50, 65, 75, 85, 95],
    "Somewhat likely": [20, 25, 45, 50, 65, 80, 85, 90, 95],
    "Likely": [25, 35, 50, 55, 75, 85, 90, 95, 100],
    "Very likely": [45, 50, 65, 75, 85, 90, 95, 95, 105],
    "Near sure thing": [50, 55, 75, 80, 90, 95, 95, 100, 115],
    "A sure thing": [55, 65, 80, 85, 90, 95, 95, 110, 125],
    "Has to be": [80, 85, 90, 95, 95, 100, 100, 130, 145],
    "Unlikely": [5, 10, 15, 20, 35, 50, 55, 75, 90],
    "Very unlikely": [5, 5, 10, 15, 25, 45, 50, 65, 85],
    "Impossible": [-20, 0, 0, 5, 5, 10, 15, 25, 50]
  };

  // Chaos number controls
  const adjustChaos = (direction) => {
    if (direction === 'prev' && chaosNumber > 1) {
      setChaosNumber(chaosNumber - 1);
    } else if (direction === 'next' && chaosNumber < 9) {
      setChaosNumber(chaosNumber + 1);
    }
  };

  // Clear display text
  const clearDisplay = () => {
    setDisplayText('');
  };

  // Tab management
  const openTab = (tabName) => {
    clearDisplay();
    setActiveTab(tabName);
  };

  // Scene button functionality
  const handleSceneStart = () => {
    clearDisplay();
    const randomInt = Math.floor(Math.random() * 10);
    
    if (randomInt > chaosNumber) {
      setDisplayText("<h3 class='word'>unmodified</h3>");
    } else if (randomInt % 2 === 0) {
      const randomIntFocus = Math.floor(Math.random() * 11);
      const eventFocusValue = eventFocus[randomIntFocus];
      const npcFocus = npcArray[Math.floor(Math.random() * npcArray.length)];
      const threadFocus = threadArray[Math.floor(Math.random() * threadArray.length)];
      
      if (randomIntFocus < 5 || npcArray.length === 0 || threadArray.length === 0) {
        setDisplayText(`<h3 class='word'>Scene interrupted</h3><h3 class='word'>${eventFocusValue}</h3>`);
      } else if (randomIntFocus < 8) {
        setDisplayText(`<h3 class='word'>Scene interrupted</h3><h3 class='word'>${eventFocusValue}</h3><h3 class='word'>${npcFocus}</h3>`);
      } else {
        setDisplayText(`<h3 class='word'>Scene interrupted</h3><h3 class='word'>${eventFocusValue}</h3><h3 class='word'>${threadFocus}</h3>`);
      }
    } else {
      setDisplayText("<h3 class='word'>Scene Altered</h3>");
    }
  };

  // Question button functionality
  const handleQuestion = () => {
    clearDisplay();
    setShowOddsModal(true);
  };

  // Event button functionality
  const handleEvent = () => {
    clearDisplay();
    const randomIntAction = Math.floor(Math.random() * 100 + 1);
    const action = eventAction[randomIntAction];
    const randomIntSubject = Math.floor(Math.random() * 100 + 1);
    const subject = eventSubject[randomIntSubject];
    setDisplayText(`<h3 class='word'>${action}</h3><h3 class='word'>${subject}</h3>`);
  };

  // Odds slider functionality
  const adjustSlide = (direction) => {
    if (direction === 'next') {
      setSlideIndex(slideIndex >= oddsValues.length ? 1 : slideIndex + 1);
    } else {
      setSlideIndex(slideIndex <= 1 ? oddsValues.length : slideIndex - 1);
    }
  };

  // Generate answer from fate chart
  const generateAnswer = () => {
    const currentOdds = oddsValues[slideIndex - 1];
    const oddIs = oddsArrays[currentOdds];
    const randomInt = Math.floor(Math.random() * 100 + 1);
    
    console.log(randomInt, chaosNumber - 1, oddIs[chaosNumber - 1]);
    
    if (randomInt % 11 === 0 && (randomInt / 11) < chaosNumber) {
      generateRandomEventAnswer(oddIs);
    } else {
      const threshold = oddIs[chaosNumber - 1];
      if (randomInt <= threshold && randomInt < (threshold / 5)) {
        setDisplayText("<h3 class='word'>yes</h3><h3 class='word'>Exceptional</h3>");
      } else if (randomInt <= threshold) {
        setDisplayText("<h3 class='word'>Yes</h3>");
      } else if (randomInt > threshold && randomInt >= (threshold / 5 + 81)) {
        setDisplayText("<h3 class='word'>No</h3><h3 class='word'>Exceptional</h3>");
      } else {
        setDisplayText("<h3 class='word'>No</h3>");
      }
    }
    setShowOddsModal(false);
  };

  // Generate random event answer
  const generateRandomEventAnswer = (oddIs) => {
    const randomIntFocus = Math.floor(Math.random() * 11);
    const eventFocusValue = eventFocus[randomIntFocus];
    const npcFocus = npcArray[Math.floor(Math.random() * npcArray.length)];
    const threadFocus = threadArray[Math.floor(Math.random() * threadArray.length)];
    const randomInt = Math.floor(Math.random() * 100 + 1);
    const threshold = oddIs[chaosNumber - 1];

    let answerText = '';
    if (randomInt <= threshold && randomInt < (threshold / 5)) {
      answerText = "<h3 class='word'>yes</h3><h3 class='word'>Exceptional</h3>";
    } else if (randomInt <= threshold) {
      answerText = "<h3 class='word'>Yes</h3>";
    } else if (randomInt > threshold && randomInt >= (threshold / 5 + 81)) {
      answerText = "<h3 class='word'>No</h3><h3 class='word'>Exceptional</h3>";
    } else {
      answerText = "<h3 class='word'>No</h3>";
    }

    if (randomIntFocus < 5 || npcArray.length === 0 || threadArray.length === 0) {
      setDisplayText(`${answerText}<h3 class='word'>Random Event</h3><h3 class='word'>${eventFocusValue}</h3>`);
    } else if (randomIntFocus < 8) {
      setDisplayText(`${answerText}<h3 class='word'>Random Event</h3><h3 class='word'>${eventFocusValue}</h3><h3 class='word'>${npcFocus}</h3>`);
    } else {
      setDisplayText(`${answerText}<h3 class='word'>Random Event</h3><h3 class='word'>${eventFocusValue}</h3><h3 class='word'>${threadFocus}</h3>`);
    }
  };

  // Character/NPC management
  const addCharacter = (character) => {
    if (character.trim() && character.match(/[0-9a-zA-z]/g)) {
      setNpcArray([...npcArray, character.trim()]);
    } else {
      alert("You must write something!");
    }
  };

  const removeCharacter = (index) => {
    setNpcArray(npcArray.filter((_, i) => i !== index));
  };

  // Thread management
  const addThread = (thread) => {
    if (thread.trim() && thread.match(/[0-9a-zA-z]/g)) {
      setThreadArray([...threadArray, thread.trim()]);
    } else {
      alert("You must write something!");
    }
  };

  const removeThread = (index) => {
    setThreadArray(threadArray.filter((_, i) => i !== index));
  };

  // Scene management
  const addScene = () => {
    const newScene = {
      id: Date.now(),
      title: '',
      content: ''
    };
    setScenes([...scenes, newScene]);
  };

  const removeScene = (id) => {
    setScenes(scenes.filter(scene => scene.id !== id));
  };

  const updateScene = (id, field, value) => {
    setScenes(scenes.map(scene => 
      scene.id === id ? { ...scene, [field]: value } : scene
    ));
  };

  return (
    <div className="App">
      <Header 
        showHowToModal={showHowToModal}
        setShowHowToModal={setShowHowToModal}
      />
      
      <TabContainer 
        activeTab={activeTab}
        openTab={openTab}
      />
      
      <Emulator
        activeTab={activeTab}
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
        npcArray={npcArray}
        threadArray={threadArray}
        addCharacter={addCharacter}
        removeCharacter={removeCharacter}
        addThread={addThread}
        removeThread={removeThread}
        scenes={scenes}
        addScene={addScene}
        removeScene={removeScene}
        updateScene={updateScene}
      />
      
      <Footer />
    </div>
  );
}

export default App;