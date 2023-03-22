import * as React from 'react';
import { useState } from 'react';

const VideoroomContext = React.createContext<
  | {
      roomName: string;
      setRoomName: React.Dispatch<React.SetStateAction<string>>;
      username: string;
      setUsername: React.Dispatch<React.SetStateAction<string>>;
    }
  | undefined
>(undefined);

const VideoroomContextProvider = (props) => {
  const [roomName, setRoomName] = useState('');
  const [username, setUsername] = useState('');
  const value = { roomName, setRoomName, username, setUsername };

  return (
    <VideoroomContext.Provider value={value}>
      {props.children}
    </VideoroomContext.Provider>
  );
};

function useVideoroomState() {
  const context = React.useContext(VideoroomContext);
  if (context === undefined) {
    throw new Error('useRoomName must be used within a VideoroomContext');
  }
  return context;
}

export { VideoroomContextProvider, useVideoroomState };
