import { useEffect, useRef, useState } from "react";

export default function StreamPage() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [lastMessage, setLastMessage] = useState<string>("");
  const localVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000");

    ws.onopen = () => {
      console.log("Connected to websocket server");
      setSocket(ws);
    };

    ws.onmessage = (event) => {
      console.log(`Received message: ${event.data}`);
      setLastMessage(event.data);
    };

    ws.onclose = () => {
      console.log("❌ Disconnected from WebSocket server");
      setSocket(null);
    };

    return () => {
      ws.close();
    };
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      console.log("🎥 Stream started", stream);
      console.log("🎥 localVideoRef", localVideoRef);
      console.log("localVideoRef.current", localVideoRef.current);
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("🚨 Error starting camera", error);
    }
  };

  const sendMessage = () => {
    if (socket) {
      socket.send("Hello from the client");
    }
  };

  return (
    <div>
      <h1>Stream Page</h1>
      <p>Socket Status: {socket ? "Connected" : "Disconnected"}</p>
      <video ref={localVideoRef} autoPlay muted playsInline></video>
      <button onClick={startCamera}>Start Camera</button>
      <button onClick={sendMessage} disabled={!socket}>
        Send Hello Message
      </button>
      <p>Last Message: {lastMessage}</p>
    </div>
  );
}
