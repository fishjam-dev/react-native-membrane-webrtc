import * as React from 'react';

type Action = { type: 'set'; val: string };
type Dispatch = (action: Action) => void;
type State = { roomName: string };

const VideoroomContext = React.createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

function VideoroomReader(state, action) {
  switch (action.type) {
    case 'set':
      return { roomName: action.val };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

const VideoroomContextProvider = (props) => {
  const [state, dispatch] = React.useReducer(VideoroomReader, {
    roomName: 'room',
  });
  const value = { state, dispatch };

  return (
    <VideoroomContext.Provider value={value}>
      {props.children}
    </VideoroomContext.Provider>
  );
};

function useRoomName() {
  const context = React.useContext(VideoroomContext);
  if (context === undefined) {
    throw new Error('useRoomName must be used within a VideoroomContext');
  }
  return context;
}

export { VideoroomContextProvider, useRoomName };
