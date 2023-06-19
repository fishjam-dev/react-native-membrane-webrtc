import { renderHook, act } from '@testing-library/react-hooks';

import { useParticipantsTracksManager } from '../src/shared/participantsTracksManager';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

require('react-native-reanimated/lib/commonjs/reanimated2/jestUtils').setUpTests();
jest.mock('react-native-reanimated', () =>
  require('react-native-reanimated/mock')
);

describe('Participants Tracks Manager', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Ordering participants according to their vad status', () => {
    const { result } = renderHook(() => useParticipantsTracksManager());

    let ordered;
    const participants = [
      {
        participant: {
          id: '1',
          type: 'Local',
          tracks: [
            {
              id: 't1',
              type: 'Video',
              metadata: { type: 'camera' },
            },
            {
              id: 't2',
              type: 'Audio',
              vadStatus: 'silience',
            },
          ],
        },
        trackId: 't1',
      },
    ];

    // Adds local participant and check if it's present after 1st exectution of the sorting function
    act(() => {
      ordered =
        result.current.orderParticipantsAccordingToVadStatus(participants);
    });

    expect(ordered).toEqual([
      {
        participant: {
          id: '1',
          type: 'Local',
          tracks: [
            {
              id: 't1',
              type: 'Video',
              metadata: { type: 'camera' },
            },
            {
              id: 't2',
              type: 'Audio',
              vadStatus: 'silience',
            },
          ],
        },
        trackId: 't1',
      },
    ]);

    participants.push({
      participant: {
        id: '2',
        type: 'Remote',
        tracks: [
          {
            id: 't3',
            type: 'Video',
            metadata: { type: 'camera' },
          },
          {
            id: 't4',
            type: 'Audio',
            vadStatus: 'silience',
          },
        ],
      },
      trackId: 't3',
    });

    // Adds one remote participant and checks if it's sorted after the user
    act(() => {
      ordered =
        result.current.orderParticipantsAccordingToVadStatus(participants);
    });

    expect(ordered).toEqual([
      {
        participant: {
          id: '1',
          type: 'Local',
          tracks: [
            {
              id: 't1',
              type: 'Video',
              metadata: { type: 'camera' },
            },
            {
              id: 't2',
              type: 'Audio',
              vadStatus: 'silience',
            },
          ],
        },
        trackId: 't1',
      },
      {
        participant: {
          id: '2',
          type: 'Remote',
          tracks: [
            {
              id: 't3',
              type: 'Video',
              metadata: { type: 'camera' },
            },
            {
              id: 't4',
              type: 'Audio',
              vadStatus: 'silience',
            },
          ],
        },
        trackId: 't3',
      },
    ]);

    // Adds 8 more participants and checks if all of them are present in the participants after applying order.
    act(() => {
      for (let i = 10; i < 18; i++) {
        participants.push({
          participant: {
            id: i.toString(),
            type: 'Remote',
            tracks: [
              {
                id: 't' + (i * 2).toString(),
                type: 'Video',
                metadata: { type: 'camera' },
              },
              {
                id: 't' + (i * 2 + 1).toString(),
                type: 'Audio',
                vadStatus: 'silience',
              },
            ],
          },
          trackId: 't' + (i * 2).toString(),
        });
      }
      ordered =
        result.current.orderParticipantsAccordingToVadStatus(participants);
    });

    expect(ordered.length).toBe(10);

    // Checks if moving talking not displayed user works.
    act(() => {
      participants[9] = {
        participant: {
          id: 't10',
          type: 'Remote',
          tracks: [
            {
              id: 't20',
              type: 'Video',
              metadata: { type: 'camera' },
            },
            {
              id: 't21'.toString(),
              type: 'Audio',
              vadStatus: 'speech',
            },
          ],
        },
        trackId: 't20',
      };
      ordered =
        result.current.orderParticipantsAccordingToVadStatus(participants);
    });

    expect(ordered[1]).toEqual({
      participant: {
        id: 't10',
        type: 'Remote',
        tracks: [
          {
            id: 't20',
            type: 'Video',
            metadata: { type: 'camera' },
          },
          {
            id: 't21'.toString(),
            type: 'Audio',
            vadStatus: 'speech',
          },
        ],
      },
      trackId: 't20',
    });

    // Checks if visible talking user is not moved.
    act(() => {
      participants[2] = {
        participant: {
          id: 't11',
          type: 'Remote',
          tracks: [
            {
              id: 't22',
              type: 'Video',
              metadata: { type: 'camera' },
            },
            {
              id: 't23'.toString(),
              type: 'Audio',
              vadStatus: 'speech',
            },
          ],
        },
        trackId: 't22',
      };
      ordered =
        result.current.orderParticipantsAccordingToVadStatus(participants);
    });

    expect(ordered[2]).toEqual({
      participant: {
        id: 't11',
        type: 'Remote',
        tracks: [
          {
            id: 't22',
            type: 'Video',
            metadata: { type: 'camera' },
          },
          {
            id: 't23'.toString(),
            type: 'Audio',
            vadStatus: 'speech',
          },
        ],
      },
      trackId: 't22',
    });

    // Checks if next not visible participant is moved to a different spot than the previous one.
    act(() => {
      participants[9] = {
        participant: {
          id: 't2',
          type: 'Remote',
          tracks: [
            {
              id: 't3',
              type: 'Video',
              metadata: { type: 'camera' },
            },
            {
              id: 't4'.toString(),
              type: 'Audio',
              vadStatus: 'speech',
            },
          ],
        },
        trackId: 't3',
      };
      ordered =
        result.current.orderParticipantsAccordingToVadStatus(participants);
    });

    expect(ordered[3]).toEqual({
      participant: {
        id: 't2',
        type: 'Remote',
        tracks: [
          {
            id: 't3',
            type: 'Video',
            metadata: { type: 'camera' },
          },
          {
            id: 't4'.toString(),
            type: 'Audio',
            vadStatus: 'speech',
          },
        ],
      },
      trackId: 't3',
    });
  });

  test('Ordering participants with screencasts', () => {
    const { result } = renderHook(() => useParticipantsTracksManager());
    let ordered;

    // Populating participants
    const participants = [
      {
        participant: {
          id: '1',
          type: 'Local',
          tracks: [
            {
              id: 't1',
              type: 'Video',
              metadata: { type: 'camera' },
            },
            {
              id: 't2',
              type: 'Audio',
              vadStatus: 'speaking',
            },
          ],
        },
        trackId: 't1',
      },
    ];
    for (let i = 10; i < 18; i++) {
      participants.push({
        participant: {
          id: i.toString(),
          type: 'Remote',
          tracks: [
            {
              id: 't' + (i * 2).toString(),
              type: 'Video',
              metadata: { type: 'camera' },
            },
            {
              id: 't' + (i * 2 + 1).toString(),
              type: 'Audio',
              vadStatus: 'silience',
            },
          ],
        },
        trackId: 't' + (i * 2).toString(),
      });
    }

    // One participant starts screencasting
    participants[8] = {
      participant: {
        id: '17',
        type: 'Remote',
        tracks: [
          {
            id: 't34',
            type: 'Video',
            metadata: { type: 'camera' },
          },
          {
            id: 't134',
            type: 'Video',
            metadata: { type: 'screensharing' },
          },
          {
            id: 't35',
            type: 'Audio',
            vadStatus: 'speech',
          },
        ],
      },
      trackId: 't34',
    };
    participants.push({
      participant: {
        id: '17',
        type: 'Remote',
        tracks: [
          {
            id: 't34',
            type: 'Video',
            metadata: { type: 'camera' },
          },
          {
            id: 't134',
            type: 'Video',
            metadata: { type: 'screensharing' },
          },
          {
            id: 't35',
            type: 'Audio',
            vadStatus: 'speech',
          },
        ],
      },
      trackId: 't134',
    });

    act(() => {
      ordered =
        result.current.orderParticipantsAccordingToVadStatus(participants);
    });

    expect(ordered[1]).toEqual({
      participant: {
        id: '17',
        type: 'Remote',
        tracks: [
          {
            id: 't34',
            type: 'Video',
            metadata: { type: 'camera' },
          },
          {
            id: 't134',
            type: 'Video',
            metadata: { type: 'screensharing' },
          },
          {
            id: 't35',
            type: 'Audio',
            vadStatus: 'speech',
          },
        ],
      },
      trackId: 't134',
    });

    // Another one starts screencasting
    participants[7] = {
      participant: {
        id: '16',
        type: 'Remote',
        tracks: [
          {
            id: 't32',
            type: 'Video',
            metadata: { type: 'camera' },
          },
          {
            id: 't132',
            type: 'Video',
            metadata: { type: 'screensharing' },
          },
          {
            id: 't33',
            type: 'Audio',
            vadStatus: 'speech',
          },
        ],
      },
      trackId: 't32',
    };
    participants.push({
      participant: {
        id: '16',
        type: 'Remote',
        tracks: [
          {
            id: 't32',
            type: 'Video',
            metadata: { type: 'camera' },
          },
          {
            id: 't132',
            type: 'Video',
            metadata: { type: 'screensharing' },
          },
          {
            id: 't33',
            type: 'Audio',
            vadStatus: 'speech',
          },
        ],
      },
      trackId: 't132',
    });

    act(() => {
      ordered =
        result.current.orderParticipantsAccordingToVadStatus(participants);
    });

    expect(ordered[2]).toEqual({
      participant: {
        id: '17',
        type: 'Remote',
        tracks: [
          {
            id: 't34',
            type: 'Video',
            metadata: { type: 'camera' },
          },
          {
            id: 't134',
            type: 'Video',
            metadata: { type: 'screensharing' },
          },
          {
            id: 't35',
            type: 'Audio',
            vadStatus: 'speech',
          },
        ],
      },
      trackId: 't134',
    });

    expect(ordered.map((t) => t.trackId)).toEqual([
      't1',
      't132',
      't134',
      't24',
      't26',
      't28',
      't30',
      't22',
      't20',
      't32',
      't34',
    ]);
  });

  test('Participants leaving', () => {
    const { result } = renderHook(() => useParticipantsTracksManager());
    let ordered;

    // Populating participants
    const participants = [
      {
        participant: {
          id: '1',
          type: 'Local',
          tracks: [
            {
              id: 't1',
              type: 'Video',
              metadata: { type: 'camera' },
            },
            {
              id: 't2',
              type: 'Audio',
              vadStatus: 'speaking',
            },
          ],
        },
        trackId: 't1',
      },
    ];
    for (let i = 10; i < 20; i++) {
      participants.push({
        participant: {
          id: i.toString(),
          type: 'Remote',
          tracks: [
            {
              id: 't' + (i * 2).toString(),
              type: 'Video',
              metadata: { type: 'camera' },
            },
            {
              id: 't' + (i * 2 + 1).toString(),
              type: 'Audio',
              vadStatus: 'silience',
            },
          ],
        },
        trackId: 't' + (i * 2).toString(),
      });
    }

    act(() => {
      ordered =
        result.current.orderParticipantsAccordingToVadStatus(participants);
    });

    expect(ordered.length).toBe(11);

    // 3rd participant(2nd remote) left.
    participants.splice(3, 1);

    act(() => {
      ordered =
        result.current.orderParticipantsAccordingToVadStatus(participants);
    });

    expect(ordered.length).toBe(10);
    expect(ordered.map((t) => t.trackId)).toEqual([
      't1',
      't20',
      't22',
      't26',
      't28',
      't30',
      't32',
      't34',
      't36',
      't38',
    ]);
  });
});
