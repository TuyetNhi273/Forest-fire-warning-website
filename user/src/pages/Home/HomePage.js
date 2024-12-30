import React, { useContext, useEffect, useState } from "react";
import { SocketContext } from "../../contexts/socket_io";
import "./style.css";
import InforDrone from "../../components/InforDrone";
import InforAtitude from "../../components/Attitude/Attitude";
import InforGps from "../../components/InforGps";
import InforCamera from "../../components/InforCamera";
import InforMap from "../../components/InforMap";
import InforWp from "../../components/InforWp";

const HomePage = () => {
  const socket = useContext(SocketContext);

  const [dataInforDrone, setDataInforDrone] = useState({
    firmware: "",
    type: "",
    mode: "",
    battery: { voltage: "", current: "", level: "" },
    heartbeat: "",
    armed: false,
    flagDisiableArmed: "",
  });

  const [alert, setAlert] = useState({});

  const [dataInforAtitude, setDataInforAtitude] = useState({
    atitude: { pitch: "", roll: "", yaw: "" },
    velocity: { vx: "", vy: "", vz: "" },
    heading: "",
  });

  const [dataInforGps, setDataInforGps] = useState({
    sat: "",
    fix: "",
    Groundspeed: "",
    lat: "",
    lon: "",
    alt: "",
    homeLocation: { lat: "", lon: "", alt: "" },
  });

  const [path, setPath] = useState([]);

  useEffect(() => {
    if (!socket) {
      console.error("Socket connection not available.");
      return;
    }

    const handleSocketData = (status) => {
      if (status?.header === "droneStatusInfor") {
        setDataInforDrone(status.data);
      } else if (status?.header === "droneStatusAtitude") {
        setDataInforAtitude(status.data);
      } else if (status?.header === "droneStatusGps") {
        setDataInforGps(status.data);
      }
      else if (status?.header === "fireDetection") {
        setAlert(status.data);
      }
    };

    socket.on("web", handleSocketData);

    return () => {
      socket.off("web", handleSocketData);
    };
  }, [socket]);

  const handlePathChange = (newPath) => {
    setPath(newPath);
    console.log("New path:", newPath);
  };

  const currentLocation = {
    lat: parseFloat(dataInforGps.lat) || 10.800659,
    lng: parseFloat(dataInforGps.lon) || 106.796288,
  };

  return (
    <div className="home">
      <div className="infoDrone">
        <InforDrone payload={dataInforDrone} alerts = {alert}/>
      </div>
      <div className="infoAtitude">
        <InforAtitude payload={dataInforAtitude} />
      </div>
      <div className="infoGps">
        <InforGps payload={dataInforGps} />
      </div>
      <div className="infoMap">
        <InforMap
          currentLocation={currentLocation}
          path={path}
          onPathChange={handlePathChange}
        />
      </div>
      <div className="infoCamera">
        <InforCamera />
      </div>
      <div className="infoWp">
        <InforWp paths={path} onPathChange={handlePathChange} />
      </div>
    </div>
  );
};

export default HomePage;
