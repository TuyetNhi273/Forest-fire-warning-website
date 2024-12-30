import React, { useState, useEffect } from 'react';

const PitchRoll = (props) => {
  const [pr, setPr] = useState({
    attitude: {
      pitch: '',
      roll: '',
    },
  });

  useEffect(() => {
    setPr(props.payload || {});
  }, [props]);

  const compassStyle1 = {
    width: '8rem',
    height: '8rem',
    border: '0.25rem solid #555',
    borderRadius: '50%',
    position: 'relative',
    margin: '0.5rem auto',
    background: 'linear-gradient(0deg,rgb(77, 213, 79) 50%, #3399FF 50%)',
    boxShadow: '0 0.25rem 0.5rem rgba(0, 0, 0, 0.3)',
    overflow: 'hidden',
  };

  //Điều chỉnh lên xuống hoặc xoay theo pitch và roll
  const horizonStyle = {
    position: 'absolute',
    width: '100%',
    height: '200%',
    top: '-50%',
    left: 0,
    background: 'linear-gradient(0deg, rgb(77, 213, 79) 50%, #3399FF 50%)',
    transform: `rotate(${parseInt(pr?.roll || 0)}deg) translateY(${parseInt(pr?.pitch) * -0.1}rem)`,
    transition: 'transform 0.1s ease-in-out',
  };

  // const needleStyle1 = {
  //   width: '2px',
  //   height: '40%',
  //   backgroundColor: '#fff',
  //   position: 'absolute',
  //   top: '13%',
  //   transform: `rotate(${pr.heading || 0}deg)`,
  //   transformOrigin: 'center bottom',
  //   zIndex: 2,
  // };

  const pitchMarkersStyle = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: '0',
    left: '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    color: '#fff',
    fontSize: '1rem',
    fontWeight: 'bold',
  };

  //Đánh dấu góc pitch nghiêng trên la bàn
  const generatePitchMarkers = () => {
    const markers = [];
    for (let i = -10; i <= 10; i += 5) {
      markers.push(
        <div
          key={i}
          style={{
            position: 'absolute',
            top: `calc(42% + ${i * -0.2}rem)`,
            width: '100%',
            textAlign: 'center',
            color: '#fff ',
          }}
        >
          {i !== 0 ? `${i}°` : ''}
        </div>,
      );
    }
    return markers;
  };

  return (
    <div style={{ display: 'block', width: 'auto', paddingLeft: '2rem' }}>
      <div style={compassStyle1}>
        <div style={horizonStyle}></div>
        {/* <div style={needleStyle1}></div> */}
        <div style={pitchMarkersStyle}>{generatePitchMarkers()}</div>
      </div>

      <div
        style={{
          marginTop: '0.5rem',
          color: 'black',
          fontSize: '1rem',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div style={{textAlign: 'center'}}>
          <span style={{ color: 'black', fontSize: '1.5rem', lineHeight: '1.5rem', fontWeight: 'bold', display: 'flex' }}>
            <p style={{ fontWeight: 'bold', display: 'inline',marginRight: '0.5rem'}}>P: {pr?.pitch || 0}° </p>
            <br /> <p style={{ fontWeight: 'bold', display: 'inline' }}>R: {pr?.roll || 0}°</p> 
          </span>
        </div>
      </div>
    </div>
  );
};

export default PitchRoll;
