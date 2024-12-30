import React, { useState, useEffect } from 'react';
import Compass from './components/compass';
import Velocity from './components/velocity';

const InforAttitude = (props) => {
  const [At, setAt] = useState({
    attitude: {
      pitch: '',
      roll: '',
      yaw: '',
    },
    heading: '',
  });

  const [Velo, setVelo] = useState({
    velocity: {
      vx: '',
      vy: '',
      vz: '',
    },
  });
  useEffect(() => {
    setAt(props.payload.attitude || {});
    setAt((prev) => ({ ...prev, heading: props.payload.heading || '' }));
  }, [props.payload.attitude, props.payload.heading]);

  useEffect(() => {
    setVelo(props.payload.velocity || {});
  }, [props.payload.velocity]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%', maxWidth: '452px' }}>
      <div style={{ display: 'flex',backgroundColor: 'aliceblue', padding: '1rem', borderRadius: '8rem', justifyContent: 'center', alignItems: 'center' }}>
      <Velocity payload={Velo} />
      <div style={{marginLeft: '20px'}}><Compass payload={At} /></div>
      </div>
    </div>
  );
};

export default InforAttitude;
