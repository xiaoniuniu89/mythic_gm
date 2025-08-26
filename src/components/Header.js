import React from 'react';

const Header = ({ showHowToModal, setShowHowToModal }) => {
  return (
    <section>
      <h1 id="logo">Mythic GM</h1>
      
      {/* How to use section contained in modal */}
      <div id="how-to">
        {/* To open modal */}
        <button 
          id="how-to-btn"
          onClick={() => setShowHowToModal(true)}
        >
          Glossary
        </button>
        
        {/* Modal window */}
        <div 
          id="how-to-modal" 
          className={`modal ${showHowToModal ? 'show' : ''}`}
        >
          {/* Content of modal */}
          <div className="how-to-content">
            <button 
              aria-label="close" 
              id="close-how-to"
              onClick={() => setShowHowToModal(false)}
            >
              <i className="far fa-times-circle"></i>
            </button>
            
            <h3 id="glossary">Glossary</h3>
            <br />
            <p>NPC = Non Player Character - Any character that the players do not control.</p>
            <br />
            <p>PC = Player Character - Any characters controlled by players.</p>
            <br />
            
            <h4>Remote Event</h4>
            <br />
            <p>
              Something important has happened that bears on the adventure, but the player characters were not present when the event occurred, they only learn about it remotely. This
              can result in many ways, from a non-player character telling them some piece of news, to coming across evidence of this other event.
            </p>
            <br />
            
            <h4>NPC Action</h4>
            <p>
              An existing non-player character makes a surprise action.
            </p>
            <br />
            
            <h4>introduce a new PC</h4>
            <br />
            <p>
              A brand new face is involved in the adventure. This may be someone the player characters had expected to meet, or a surprise.
            </p>
            <br />
            
            <h4>Move towards a thread</h4>
            <br />
            <p>
              Threads are the goals that player characters are going after. These are the unresolved missions that the players are trying to solve. There could be more than one thread in an
              adventure, some big and important while others of less consequence.
            </p>
            <br />
            
            <h4>Move away from a thread</h4>
            <br />
            <p>
              Just as the previous random event will help player characters solve an open thread, this random event will make it harder.
            </p>
            <br />
            
            <h4>Close a thread</h4>
            <br />
            <p>
              The random event is so important it actually closes an open thread. To close a thread, the issue is resolved or simply goes away out of the PC's minds.
            </p>
            <br />
            
            <h4>PC/NPC negative/positive</h4>
            <br />
            <p>
              Something bad, or good, happens to a player character, or non player character.
            </p>
            <br />
            
            <h4>Ambiguous event</h4>
            <br />
            <p>
              This is a catchall category for anything that does not directly impact characters or NPCs. The event is not necessarily bad or good. The event can be important, but often it is more
              atmospheric to the scene.
            </p>
            <br />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;