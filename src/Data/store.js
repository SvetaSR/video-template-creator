import { atomFamily, selectorFamily, atom } from 'recoil';

let counter = 0;

// list of tracks
export const tracksListState = atom({
    key: "tracksListState",
    default: []
});


// track options
export const trackOptionsState = atomFamily({
    key: "trackOptionsState",
    default: selectorFamily({
        key: 'trackOptionsState/Default',
        get: (param) => () => {
          counter++;
          return {
            name: counter === 1 ? 'Track' : `Track (${counter})`,
            isActive: false
          };
        },
      }),
});

// track list of media
export const trackMediaListState = atomFamily({
    key: "trackMediaListState",
    default: []
});

// a single media
export const mediaState = atomFamily({
    key: "mediaState",
    default: {}
});

export const mediaTracksRelationState = selectorFamily({
    key: "mediaTracksRelationState",
    get: (trackId) => ({ get }) => {
         const mediaList = get(trackMediaListState(trackId));
         return mediaList.map((mediaId, index) => {
            const prevMediaEnd = index === 0 ? 0 : get(mediaState(mediaList[index - 1])).end;
            const nextMediaStart = (index === mediaList.length - 1) ? 60 : get(mediaState(mediaList[index + 1])).start;
            return {id: mediaId, prevMediaEnd, nextMediaStart};
         });
    },
    set: (trackId) => ({ set, get }, payload) => {
        if (payload.action === 'addMediaToTrack') {
            const { mediaData } = payload
            set(mediaState(mediaData.id), mediaData);

            const trackList = get(trackMediaListState(trackId));
            const mappedTrackList = trackList.map((mediaId) => get(mediaState(mediaId)));
            // not necessarily efficient, but quick and easy
            const newTrackList = [...mappedTrackList, mediaData].sort((a,b) => a.start - b.start).map(({ id }) => id );
            set(trackMediaListState(trackId), newTrackList);        }
    }
  });