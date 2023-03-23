export type PreviewTitle = 'New meeting' | 'Join meeting';

export type RootStack = {
  Room: undefined;
  CreateRoom: undefined;
  InitialScreen: undefined;
  JoinRoom: { roomName: string } | undefined;
  Preview: { title: PreviewTitle };
};
