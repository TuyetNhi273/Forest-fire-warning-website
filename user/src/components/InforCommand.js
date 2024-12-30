import React, { useState, useContext, useEffect } from 'react';
import { send_socketIo } from '../services/socketIo';
import { SocketContext } from '../contexts/socket_io';

const InforCommand = () => {
  const [command, setCommand] = useState('');
  const [isArmed, setIsArmed] = useState(false);
  const [isTakingOff, setIsTakingOff] = useState(false);
  const [isRunningCoffee, setIsRunningCoffee] = useState(false);
  const [isLanding, setIsLanding] = useState(false);
  const [isReturningHome, setIsReturningHome] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [focusValue, setFocusValue] = useState(0);
  const [isAutoFocus, setIsAutoFocus] = useState(true);
  const [notification, setNotification] = useState('');
  const [flyStatus, setFlyStatus] = useState('');
  const [takeoffAltitude, setTakeoffAltitude] = useState(0);
  const [zoomValue, setZoomValue] = useState(1);
  const [isServoOpen, setIsServoOpen] = useState(false); // State for servo open/close

  const socket = useContext(SocketContext);

  useEffect(() => {
    const handleSocketMessage = (status) => {
      if (status.header === 'droneStatus') {
        setNotification(String(status.data));
      } else if (status.header === 'droneFlyStatus') {
        setFlyStatus(String(status.data));
      }
    };

    socket.on('web', handleSocketMessage);

    return () => {
      socket.off('web', handleSocketMessage);
    };
  }, [socket]);

  const handleCommandChange = (e) => {
    setCommand(e.target.value);
  };

  const handleAltitudeChange = (e) => {
    setTakeoffAltitude(e.target.value);
  };

  const handleFocusChange = (e) => {
    setFocusValue(e.target.value);
  };

  const handleZoomChange = (e) => {
    setZoomValue(e.target.value);
  };

  const sendCommand = () => {
    console.log(`Command sent: ${command}`);
    send_socketIo("controlMsg", "drone", "command", command);
  };

  const arm = () => {
    console.log('arm/disarm button clicked');
    setIsArmed(!isArmed);
    send_socketIo("controlMsg", "drone", "arm", !isArmed);
  };

  const takeoff = () => {
    console.log('Takeoff button clicked');
    setIsTakingOff(!isTakingOff);
    send_socketIo("controlMsg", "drone", "takeoff", {
      "alt": takeoffAltitude,
      "ctrl": !isTakingOff
    });
  };

  const runCoffee = () => {
    console.log('Run Coffee button clicked');
    setIsRunningCoffee(!isRunningCoffee);
    send_socketIo("controlMsg", "drone", "runCoffee", !isRunningCoffee);
  };

  const land = () => {
    console.log('Land button clicked');
    setIsLanding(!isLanding);
    send_socketIo("controlMsg", "drone", "land", !isLanding);
  };

  const returnToHome = () => {
    console.log('Return to Home button clicked');
    setIsReturningHome(!isReturningHome);
    send_socketIo("controlMsg", "drone", "returnToHome", !isReturningHome);
  };

  const toggleCamera = () => {
    console.log('Toggle Camera button clicked');
    setIsCameraOn(!isCameraOn);
    send_socketIo("controlMsg", "drone", "camera", !isCameraOn ? 'on' : 'off');
  };

  const setLensFocus = () => {
    console.log(`Set Lens Focus: ${focusValue}`);
    send_socketIo("controlMsg", "drone", "lensFocus", focusValue);
  };

  const toggleFocusMode = () => {
    console.log('Toggle Focus Mode button clicked');
    setIsAutoFocus(!isAutoFocus);
    send_socketIo("controlMsg", "drone", "focusMode", isAutoFocus ? 'manual' : 'auto');
  };

  const setZoom = () => {
    console.log(`Set Zoom Value: ${zoomValue}`);
    send_socketIo("controlMsg", "drone", "zoom", zoomValue);
  };

  const toggleServo = () => {
    console.log('Toggle Servo button clicked');
    setIsServoOpen(!isServoOpen);
    send_socketIo("controlMsg", "drone", "servo", isServoOpen ? 'close' : 'open');
  };

  return (
    <div>
      <button onClick={arm}>{isArmed ? 'Disarm' : 'Arm'}</button>
      <br />
      <input 
        type="number" 
        value={takeoffAltitude} 
        onChange={handleAltitudeChange} 
        placeholder="Enter takeoff altitude" 
      />
      <button onClick={takeoff}>{isTakingOff ? 'Cancel Takeoff' : 'Takeoff'}</button>
      <button onClick={land}>{isLanding ? 'Cancel Landing' : 'Land'}</button>
      <br />
      <button onClick={returnToHome}>{isReturningHome ? 'Cancel Return' : 'Return to Home'}</button>
      <button onClick={runCoffee}>{isRunningCoffee ? 'Stop Coffee' : 'Run Coffee'}</button>
      <br />
      <button onClick={toggleCamera}>{isCameraOn ? 'Turn Camera Off' : 'Turn Camera On'}</button>
      <br />
      <input 
        type="number" 
        value={focusValue} 
        onChange={handleFocusChange} 
        placeholder="Enter focus value" 
      />
      <button onClick={setLensFocus}>Set Lens Focus</button>
      <button onClick={toggleFocusMode}>{isAutoFocus ? 'Switch to Manual Focus' : 'Switch to Auto Focus'}</button>
      <br />
      <input 
        type="number" 
        value={zoomValue} 
        onChange={handleZoomChange} 
        placeholder="Enter zoom value" 
      />
      <button onClick={setZoom}>Set Zoom</button>
      <br />
      <button onClick={toggleServo}>{isServoOpen ? 'Close Servo' : 'Open Servo'}</button>
      <br />
      <input 
        type="text" 
        value={command} 
        onChange={handleCommandChange} 
        placeholder="Enter command" 
      />
      <button onClick={sendCommand}>Send Command</button>
      <br /> 
      <label>Notification: {notification}</label> 
      <br />
      <label>Fly Status: {flyStatus}</label>
    </div>
  );
};

export default InforCommand;
