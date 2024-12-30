import React, { useState, useEffect } from 'react';
import Yaw from './compass/yaw';
import PitchRoll from './compass/pitchroll';

const Compass = (props) => {
  const [payload, setPayload] = useState({
    attitude: {
      pitch: '',
      roll: '',
      yaw: '',
    },
    heading: '',
  });

  useEffect(() => {
    setPayload(props.payload || {});
  }, [props]);

  return (
    <div>
      <div
        style={{
          padding: '12px',
          color: 'black',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Yaw payload={payload} />
        <PitchRoll payload={payload} />
      </div>
    </div>
  );
};

export default Compass;
