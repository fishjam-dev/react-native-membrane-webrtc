export type PreviewTitle = 'New meeting' | 'Join meeting';

export type RootStack = {
  Room: undefined;
  CreateRoom: { roomName: string } | undefined;
  InitialScreen: undefined;
  JoinRoom: undefined;
  Preview: { title: PreviewTitle };
};
