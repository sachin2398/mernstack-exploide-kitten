import React from 'react';

const Card = ({ id, card }) => {
  return (
      <div className="card-scene">
          
      <div id={id} className="card">
              <div className="card-face card-backing">
                   <div className="top-banner">Tap to Reveal</div>
          <div className="grain-overlay"></div>
         
          
          <div className="back-main">
            <div className="pipboy">
              <div className="twelve-point-star"></div>
              <img src="/images/card_cover.jpg" alt="card cover" />
            </div>
          </div>
         
        </div>
        <div className="card-face card-front">
          <h1>{card}</h1>
          <div className="main-pane">
            <img className="slugger" src={`/images/${card}.jpg`} alt="card front" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
