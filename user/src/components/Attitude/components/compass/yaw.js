import React, { useState, useEffect } from 'react';
const Yaw = (props) => {
  const [yh, setYh] = useState({
    heading: '',
  });

  useEffect(() => {
    setYh(props.payload || {});
  }, [props.payload]);

  const compassStyle = {
    width: '8rem',
    height: '8rem',
    border: '.4rem solid #555',
    borderRadius: '50%',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
    boxShadow: '0 0.2rem 0.5rem rgba(0, 0, 0, 0.3)',
    color: '#fff',
  };

  const needleStyle = {
    width: '2px',
    height: '40%',
    backgroundColor: '#fff',
    position: 'absolute',
    top: '13%',
    transform: `rotate(${yh.heading || 0}deg)`,
    transformOrigin: 'center bottom',
    zIndex: 2,
  };

  const ticksStyle = {
    position: 'absolute',
    width: '100%',
    height: '100%',
  };

  const generateTicks = () => {
    let ticks = [];
    for (let i = 0; i < 360; i += 15) {
      const tickStyle = {
        position: 'absolute',
        width: i % 30 === 0 ? '2px' : '1px',
        height: '0.2rem',
        backgroundColor: '#fff',
        top: '50%',
        left: '50%',
        transformOrigin: 'center bottom',
        transform: `translate(-50%, 0) rotate(${i}deg)`,
      };
      const tickLabelStyle = {
        position: 'absolute',
        fontSize: '0.7rem',
        transform: `translate(-50%, 0) rotate(${i}deg) translate(0, -80px) rotate(${-i}deg)`,
        top: '44%',
        left: '50%',
        color: 'black',
        fontWeight: 'bold',
      };
      ticks.push(<div key={i} style={tickStyle}></div>);
      if (i % 30 === 0) {
        ticks.push(
          <div key={`${i}label`} style={tickLabelStyle}>
            {i}
          </div>,
        );
      }
    }
    return ticks;
  };

  const getDirection = (heading) => {
    if (heading >= 337.5 || heading < 22.5) return 'N';
    if (heading >= 22.5 && heading < 67.5) return 'NE';
    if (heading >= 67.5 && heading < 112.5) return 'E';
    if (heading >= 112.5 && heading < 157.5) return 'SE';
    if (heading >= 157.5 && heading < 202.5) return 'S';
    if (heading >= 202.5 && heading < 247.5) return 'SW';
    if (heading >= 247.5 && heading < 292.5) return 'W';
    if (heading >= 292.5 && heading < 337.5) return 'NW';
    return '';
  };

  const directionsStyle = {
    position: 'absolute',
    color: '#fff',
    fontWeight: 'bold',
  };

  return (
    <div style={{ display: 'block', width: 'auto' }}>
      <div style={compassStyle}>
        <div style={ticksStyle}>{generateTicks()}</div>
        <div style={needleStyle}></div>

        <div
          style={{
            ...directionsStyle,
            top: '5%',
            left: '50%',
            transform: 'translateX(-50%)',
            color: '#D32F2F',
            fontSize: '0.75rem',
          }}
        >
          N
        </div>
        <div
          style={{ ...directionsStyle, right: '5%', top: '50%', transform: 'translateY(-50%)', fontSize: '0.75rem' }}
        >
          E
        </div>
        <div
          style={{ ...directionsStyle, bottom: '5%', left: '50%', transform: 'translateX(-50%)', fontSize: '0.75rem' }}
        >
          S
        </div>
        <div style={{ ...directionsStyle, left: '5%', top: '50%', transform: 'translateY(-50%)', fontSize: '0.75rem' }}>
          W
        </div>
      </div>
      <div style={{ marginTop: '1rem', textAlign: 'center', paddingTop: '.8rem' }}>
        <span style={{ color: 'black', fontSize: '1.5rem', fontWeight: 'bold', }}>
          {yh.heading || 'N/A'}° {getDirection(yh.heading || 0)}
        </span>
      </div>
    </div>
  );
};

export default Yaw;
