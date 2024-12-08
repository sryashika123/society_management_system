import React, { useState, useRef } from 'react';
import Picker from 'emoji-picker-react'; // Import emoji picker
import attechment from '../../../Icons/attachment.png';
import camera from '../../../Icons/camera.png';
import voice from '../../../Icons/voice.png';
import emoji from '../../../Icons/emojis.png';

const ChatInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false); // State to toggle emoji picker
  const videoRef = useRef(null);

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (message.trim() || file) {
      const formData = new FormData();
      formData.append('message', message);
      if (file) {
        formData.append('file', file);
      }

      await onSendMessage(formData);
      setMessage('');
      setFile(null);
    }
  };

  const triggerFileInput = () => {
    document.getElementById('fileInput').click();
  };

  const openCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      setIsCameraOpen(true);
    } catch (err) {
      console.error("Error accessing camera: ", err);
      alert("Unable to access camera. Please check your permissions.");
    }
  };

  const closeCamera = () => {
    if (videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraOpen(false);
  };

  // Function to handle emoji selection
  const onEmojiClick = (emojiData) => {
    setMessage((prevMessage) => prevMessage + emojiData.emoji); // Emoji data માં સીધું `emoji` પ્રોપર્ટી એક્સેસ કરો
    setShowEmojiPicker(false); // Emoji picker બંધ કરો
  };
  
  return (
    <div className="chat-input border-none">
      <form onSubmit={handleSubmit} className="d-flex">
        <div className="input-group border-none" style={{ position: 'relative' }}>
          {/* Emoji button */}
          <button
            type="button"
            className="btn"
            style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }}
            onClick={() => setShowEmojiPicker(!showEmojiPicker)} // Toggle emoji picker
          >
            <img src={emoji} alt="emoji" />
          </button>

          {/* Message input */}
          <input
            type="text"
            className="rounded-5 shadow border-0"
            style={{ width: '1160px', paddingLeft: '60px', height: '40px' }}
            placeholder="Type a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          {/* Attachment button */}
          <button
            type="button"
            className="btn"
            style={{ position: 'absolute', right: '50px', top: '50%', transform: 'translateY(-50%)' }}
            onClick={triggerFileInput}
          >
            <img src={attechment} alt="attachment" />
          </button>

          <input
            id="fileInput"
            type="file"
            accept="image/*, .pdf, .docx, .txt, .png, .jpg, .jpeg"
            style={{ display: 'none' }}
            onChange={handleFileSelect}
          />

          {/* Camera button */}
          <button
            type="button"
            className="btn"
            style={{ position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)' }}
            onClick={openCamera}
          >
            <img src={camera} alt="camera" />
          </button>
        </div>

        {/* Send button */}
        <button type="submit" className="btn">
          <img
            style={{ height: '70px', marginLeft: '20px', marginTop: '20px' }}
            src={voice}
            alt="voice"
          />
        </button>
      </form>

      {/* Emoji Picker */}
      {showEmojiPicker && (
        <div style={{ position: 'absolute', bottom: '100px', left: '680px', zIndex: 1000 }}>
          <Picker onEmojiClick={onEmojiClick} />
        </div>
      )}

      {/* Camera stream display */}
      {isCameraOpen && (
        <div className="camera-container">
          <video ref={videoRef} autoPlay playsInline width="300" height="200" />
          <button type="button" onClick={closeCamera}>Close Camera</button>
        </div>
      )}
    </div>
  );
};

export default ChatInput;
