import { renderHook, act } from '@testing-library/react-hooks';

import {
  useParticipantsTracksManager,
  ParticipantWithTrack,
} from '../src/shared/participantsTracksManager';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

require('react-native-reanimated/lib/commonjs/reanimated2/jestUtils').setUpTests();
jest.mock('react-native-reanimated', () =>
  require('react-native-reanimated/mock')
);

type TestParticipantParameter = {
  id: string;
  speaking?: boolean;
  local?: boolean;
  isParticipantScreensharing?: boolean;
  isTrackScreenshare?: boolean;
  timeAdded?: number;
};

function createParticipant({
  id,
  speaking = false,
  local = false,
  isParticipantScreensharing = false,
  isTrackScreenshare = false,
  timeAdded = 0,
}: TestParticipantParameter): ParticipantWithTrack {
  const participant = {
    participant: {
      id,
      type: local ? 'Local' : 'Remote',
      tracks: [
        {
          id: 'video' + id,
          type: 'Video',
          metadata: {
            type: 'camera',
          },
        },
        {
          id: 'audio' + id,
          type: 'Audio',
          vadStatus: speaking ? 'speech' : 'silence',
        },
      ],
    },
    trackId: isTrackScreenshare ? 'screensharing' + id : 'video' + id,
    timeAdded,
  };

  if (isParticipantScreensharing) {
    participant.participant.tracks.push({
      id: 'screensharing' + id,
      type: 'Video',
      metadata: {
        type: 'screensharing',
      },
    });
  }

  return participant;
}

describe('Participants Tracks Manager', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Ordering participants according to their vad status', () => {
    const { result } = renderHook(() => useParticipantsTracksManager());

    let participants = [createParticipant({ id: '1', local: true })];

    // Adds local participant and check if it's present after 1st exectution of the sorting function
    act(() => {
      participants =
        result.current.orderParticipantsAccordingToVadStatus(participants);
    });

    expect(participants).toEqual([createParticipant({ id: '1', local: true })]);

    participants.push(createParticipant({ id: '2' }));

    // Adds one remote participant and checks if it's sorted after the user
    act(() => {
      participants =
        result.current.orderParticipantsAccordingToVadStatus(participants);
    });

    expect(participants).toEqual([
      createParticipant({ id: '1', local: true }),
      createParticipant({ id: '2' }),
    ]);

    // Adds 8 more participants and checks if all of them are present in the participants after applying order.
    act(() => {
      for (let i = 10; i < 18; i++) {
        participants.push(createParticipant({ id: i.toString() }));
      }
      participants =
        result.current.orderParticipantsAccordingToVadStatus(participants);
    });

    expect(participants.length).toBe(10);

    // Checks if moving talking not displayed user works.
    act(() => {
      participants[9] = createParticipant({ id: '17', speaking: true });
      participants =
        result.current.orderParticipantsAccordingToVadStatus(participants);
    });

    expect(participants[1]).toEqual(
      createParticipant({ id: '17', speaking: true })
    );

    // Checks if visible talking user is not moved.
    act(() => {
      participants[2] = createParticipant({ id: '10', speaking: true });

      participants =
        result.current.orderParticipantsAccordingToVadStatus(participants);
    });

    expect(participants[2]).toEqual(
      createParticipant({ id: '10', speaking: true })
    );

    // Checks if next not visible participant is moved to a different spot than the previous one.
    act(() => {
      participants[9] = createParticipant({ id: '2', speaking: true });
      participants =
        result.current.orderParticipantsAccordingToVadStatus(participants);
    });

    expect(participants[3]).toEqual(
      createParticipant({ id: '2', speaking: true })
    );
  });

  test('Ordering participants with screencasts', () => {
    const { result } = renderHook(() => useParticipantsTracksManager());

    // Populating participants
    let participants = [
      createParticipant({ id: '1', speaking: true, local: true }),
    ];
    for (let i = 10; i < 18; i++) {
      participants.push(createParticipant({ id: i.toString() }));
    }

    // One participant starts screencasting
    participants[8] = createParticipant({
      id: '17',
      isParticipantScreensharing: true,
    });
    participants.push(
      createParticipant({
        id: '17',
        isParticipantScreensharing: true,
        isTrackScreenshare: true,
        timeAdded: 1,
      })
    );

    act(() => {
      participants =
        result.current.orderParticipantsAccordingToVadStatus(participants);
    });

    expect(participants[1]).toEqual(
      createParticipant({
        id: '17',
        isParticipantScreensharing: true,
        isTrackScreenshare: true,
        timeAdded: 1,
      })
    );

    // Another one starts screencasting
    participants[7] = createParticipant({
      id: '16',
      speaking: true,
      isParticipantScreensharing: true,
    });
    participants.push(
      createParticipant({
        id: '16',
        isParticipantScreensharing: true,
        isTrackScreenshare: true,
        timeAdded: 2,
      })
    );

    act(() => {
      participants =
        result.current.orderParticipantsAccordingToVadStatus(participants);
    });

    expect(participants[2]).toEqual(
      createParticipant({
        id: '17',
        isParticipantScreensharing: true,
        isTrackScreenshare: true,
        timeAdded: 1,
      })
    );

    expect(participants.map((t) => t.trackId)).toEqual([
      'video1',
      'screensharing16',
      'screensharing17',
      'video16',
      'video11',
      'video12',
      'video13',
      'video14',
      'video10',
      'video17',
    ]);
  });

  test('Participants leaving', () => {
    const { result } = renderHook(() => useParticipantsTracksManager());

    // Populating participants
    let participants = [createParticipant({ id: '1', local: true })];
    for (let i = 10; i < 20; i++) {
      participants.push(createParticipant({ id: i.toString() }));
    }

    act(() => {
      participants =
        result.current.orderParticipantsAccordingToVadStatus(participants);
    });

    expect(participants.length).toBe(11);

    // 3rd participant(2nd remote) left.
    participants.splice(3, 1);

    act(() => {
      participants =
        result.current.orderParticipantsAccordingToVadStatus(participants);
    });

    expect(participants.length).toBe(10);
    expect(participants.map((t) => t.trackId)).toEqual([
      'video1',
      'video10',
      'video11',
      'video13',
      'video14',
      'video15',
      'video16',
      'video17',
      'video18',
      'video19',
    ]);
  });
});
