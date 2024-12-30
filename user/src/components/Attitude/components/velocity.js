import React, { useState, useEffect } from 'react';

const Velocity = (props) => {
  const [payload, setPayload] = useState({
    velocity: {
      speed: '',
    },
    altitude: '',
    verticalSpeed: '',
  });

  useEffect(() => {
    setPayload(props.payload || {});
  }, [props.payload]);

  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
    color: '#fff',
    padding: '1.2rem 1.5rem',
    borderRadius: '5.5rem',
    fontFamily: 'Arial, sans-serif',
    width: '14.8rem',
    height: '8rem',
  };

  const leftPanelStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const altitudeStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  };

  const verticalSpeedStyle = {
    fontSize: '1rem',
  };

  const arrowsStyle = {
    fontSize: '1.5rem',
    margin: '0.2rem 0',
  };

  const rulerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    margin: '0 1rem',
    height: '5rem',
    marginBottom: '1.2rem',
  };

  const tickStyle1 = {
    width: '1.1rem',
    height: '0.1rem',
    backgroundColor: '#fff',
    marginBottom: '0.6rem',
  };

  const tickStyle2 = {
    width: '2rem',
    height: '0.1rem',
    backgroundColor: '#fff',
  };

  const gaugeStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '8.5rem',
    height: '8.5rem',
    borderRadius: '50%',
    backgroundColor: '#1e1e1e',
    color: '#fff',
    textAlign: 'center',
    marginRight: '-0.7rem',
    border: '0.25rem solid aliceblue',
  };

  const gaugeValueStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginTop: '2rem',
  };

  const renderRulerTicks = () => {
    const ticks = [];
    for (let i = 120; i >= 0; i -= 40) {
      ticks.push(
        <div key={i} style={{ display: 'inline', alignItems: 'center'}}>
          <div style={tickStyle1}></div>
          <div style={tickStyle2}></div>
        </div>
      );
    }
    return ticks;
  };

  return (
    <div style={containerStyle}>
      {/* Left Panel for Altitude and Vertical Speed */}
      <div style={leftPanelStyle}>
        <div style={arrowsStyle}>&uarr;</div>
        <div style={altitudeStyle}>{payload.altitude || 'N/A'}</div>
        <div style={{fontSize: '0.8rem'}}>m</div>
        <div style={arrowsStyle}>&darr;</div>
        
      </div>

      {/* Ruler for Speed Values */}
      <div>
        <div style={rulerStyle}>{renderRulerTicks()}</div>
        <div style={verticalSpeedStyle}>{payload.verticalSpeed || 'N/A'} m/s</div>
      </div>
      

      {/* Circular Gauge for Speed */}
      <div style={gaugeStyle}>
        <div style={gaugeValueStyle}>{payload.velocity?.speed || 'N/A'}</div>
        <div style={{marginTop: '1.5rem', fontSize: '0.8rem'}}>Km/h</div>
      </div>
    </div>
  );
};

export default Velocity;