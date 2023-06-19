import { MAX_NUM_OF_USERS_ON_THE_SCREEN } from '@components/Participants';
import * as Membrane from '@jellyfish-dev/react-native-membrane-webrtc';
import { getNumberOfCurrentlyVisiblePlaces } from '@utils';
import { useRef, useEffect } from 'react';

type ParticipantWithTrack = {
  participant: Membrane.Participant;
  trackId?: string;
};

type LRUNode = {
  lastActive: number;
  isActive: boolean;
  index: number;
  // Local user and screenshare tracks
  // are not movable and should stay on top.
  isMovable: boolean;
};

// Used to manage order in which participants tracks are displayed.
export const useParticipantsTracksManager = () => {
  // This string array will containg strings in a form of participantId+trackId
  // to differentiate between camera and screenshare video tracks.
  const participantsOrder = useRef<string[] | null>(null);
  const lru = useRef<LRUNode[]>([]);

  // LRU initialization
  useEffect(() => {
    for (let i = 1; i < MAX_NUM_OF_USERS_ON_THE_SCREEN; i++) {
      lru.current.push({
        lastActive: i,
        isActive: false,
        index: i,
        isMovable: true,
      });
    }

    return () => {
      lru.current = [];
    };
  }, []);

  const isScreensharingTrack = (track: Membrane.Track | undefined) => {
    return track?.metadata.type === 'screensharing';
  };

  const isParticipantScreensharing = (participant: ParticipantWithTrack) => {
    return isScreensharingTrack(
      participant.participant.tracks.find((t) => t.id === participant.trackId)
    );
  };

  // First not movable tracks(local and screenshares) then least recently used.
  const lruComparator = (a: LRUNode, b: LRUNode) => {
    if (a.isMovable) {
      if (b.isMovable) {
        return a.lastActive > b.lastActive ? 1 : -1;
      } else {
        return -1;
      }
    } else if (b.isMovable) {
      return 1;
    }
    return 0;
  };

  // This pushes screenshares to the top.
  const orderByScreenshare = (
    a: ParticipantWithTrack,
    b: ParticipantWithTrack
  ) => {
    if (a.participant.type === 'Local') {
      return -1;
    } else if (b.participant.type === 'Local') {
      return 1;
    }

    if (isParticipantScreensharing(a)) {
      if (isParticipantScreensharing(b)) {
        return -1;
      } else {
        return -1;
      }
    }

    if (isParticipantScreensharing(b)) {
      return 1;
    }

    return 0;
  };

  const updateLRU = (participants: ParticipantWithTrack[]) => {
    const currentlyVisiblePlaces = getNumberOfCurrentlyVisiblePlaces(
      MAX_NUM_OF_USERS_ON_THE_SCREEN,
      participants.length
    );
    const lruIterationLimit =
      Math.min(currentlyVisiblePlaces, participants.length) - 1;

    const now = Date.now();

    for (let i = 0; i < lruIterationLimit; i++) {
      const p = participants[lru.current[i].index];
      if (p === undefined) {
        break;
      }
      if (
        p.participant.tracks.find((t) => t.type === 'Audio')?.vadStatus ===
        'speech'
      ) {
        lru.current[i].isActive = true;
        lru.current[i].lastActive = now;
      } else {
        lru.current[i].isActive = false;
      }

      if (isParticipantScreensharing(p)) {
        lru.current[i].isMovable = false;
      } else {
        lru.current[i].isMovable = true;
      }
    }
  };

  const getNextNotSpeakingVisiblePlace = (
    participants: ParticipantWithTrack[]
  ) => {
    const currentlyVisiblePlaces = getNumberOfCurrentlyVisiblePlaces(
      MAX_NUM_OF_USERS_ON_THE_SCREEN,
      participants.length
    );

    const sortedLRU = lru.current.slice().sort(lruComparator);

    // This takes care of a case where there is one spot taken by
    // "Other Participants" tile.
    let node = sortedLRU[0];
    if (node.index >= currentlyVisiblePlaces) {
      node = sortedLRU[1];
    }
    if (node.isActive === false && node.isMovable === true) {
      return node.index;
    }

    // In case that there are no free spots at the moment.
    return -1;
  };

  const saveCurrentOrder = (participants: ParticipantWithTrack[]) => {
    participantsOrder.current = participants.map(
      (p) => p.participant.id + p.trackId
    );
  };

  const applyPrevOrder = (participants: ParticipantWithTrack[]) => {
    const properlyOrderedParticipants: ParticipantWithTrack[] = [];

    // Base case, nothing to apply order to.
    if (
      participantsOrder.current === null ||
      participantsOrder.current.length === 1
    ) {
      return participants;
    }

    participantsOrder.current.forEach((id) => {
      const participant = participants.find(
        (p) => p.participant.id + p.trackId === id
      );
      // This check is needed since if user will leave participantsOrder
      // won't know this until after this function is executed.
      // This makes sure no null/undefined object will make it to the displayed participants.
      if (participant) {
        properlyOrderedParticipants.push(participant);
      }
    });

    // Collects participants that are not part of the
    // prev order (meaning that they have just joined).
    const newParticipants = participants.filter(
      (p) =>
        participantsOrder.current?.find(
          (po) => po === p.participant.id + p.trackId
        ) === undefined
    );
    newParticipants.forEach((p) => {
      properlyOrderedParticipants.push(p);
    });

    return properlyOrderedParticipants;
  };

  const orderAndSave = (participants: ParticipantWithTrack[]) => {
    const currentlyVisiblePlaces = getNumberOfCurrentlyVisiblePlaces(
      MAX_NUM_OF_USERS_ON_THE_SCREEN,
      participants.length
    );

    for (let i = currentlyVisiblePlaces; i < participants.length; i++) {
      const freeSpot = getNextNotSpeakingVisiblePlace(participants);

      // If there are no more non speaking spots then don't move anyone.
      if (freeSpot === -1) {
        break;
      }

      const p = participants[i].participant;
      const audioTrack = p.tracks.find((t) => t.type === 'Audio');
      if (audioTrack?.vadStatus === 'speech') {
        // Swap speaking with non speaking participants.
        const tmp = participants[i];
        participants[i] = participants[freeSpot];
        participants[freeSpot] = tmp;
      }
    }

    participants = participants.sort(orderByScreenshare);
    saveCurrentOrder(participants);
    updateLRU(participants);
    return participants;
  };

  const orderParticipantsAccordingToVadStatus = (
    participants: ParticipantWithTrack[]
  ) => {
    return orderAndSave(applyPrevOrder(participants));
  };

  return { orderParticipantsAccordingToVadStatus, isScreensharingTrack };
};
