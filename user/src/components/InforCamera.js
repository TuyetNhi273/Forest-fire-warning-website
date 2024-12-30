import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";

const socket = io("ws://103.167.198.50:6001"); // Replace with your server URL

const InforCamera = () => {
  const [room, setRoom] = useState("");
  const canvasRef = useRef(null);
  const imgRef = useRef(null);
  const [isInRoom, setIsInRoom] = useState(false);
  const [status, setStatus] = useState("Not Joined");

  useEffect(() => {
    socket.on("video_frame", (buffer) => {
      if (isInRoom) {
        const data = new Uint8Array(buffer);
        const url = `data:image/jpeg;base64,${btoa(
          String.fromCharCode.apply(null, data)
        )}`;
        if (imgRef.current) {
          URL.revokeObjectURL(imgRef.current.src);
        }
        imgRef.current = new Image();
        imgRef.current.src = url;
        imgRef.current.onload = () => {
          const canvas = canvasRef.current;
          const ctx = canvas.getContext("2d");
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(imgRef.current, 0, 0, canvas.width, canvas.height);
        };
      }
    });

    return () => {
      socket.off("video_frame");
    };
  }, [isInRoom]);

  const handleJoinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
      setRoom("");
      setIsInRoom(true);
      setStatus("Joined");
    }
  };

  const handleLeaveRoom = () => {
    if (isInRoom) {
      socket.emit("leave_room", room);
      setIsInRoom(false);
      setStatus("Not Joined");
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };
  return (
    <div className="container p-5" style={{paddingTop:"16px"}}>
      <div className="mb-3">
        <input
          type="text"
          placeholder="Room"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          className="form-control mb-2"
        />
        <button onClick={handleJoinRoom} className="btn btn-primary m-2">
          Join Room
        </button>
        <button onClick={handleLeaveRoom} className="btn btn-secondary m-2">
          Leave Room
        </button>
        <p className="lead">Status: {status}</p>
      </div>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "auto",width: "80%", height: "58%", backgroundColor: "black" }}>
      <canvas
        ref={canvasRef}
        style={{
          display:"flex",
          justifyContent:"center",
          alignItems:"center",
          width:"100%",
          height:"100%",
        }}
        className="border border-dark d-block mx-auto"
      ></canvas>
      </div>
    </div>
  );
}

export default InforCamera