import React, {useEffect} from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { TrackOptions } from "./TrackOptions";
import { Track } from "./Track";
import { TimeRuler } from "./TimeRuler";
import { TracksMenu } from "./TracksMenu";
import { tracksListState, mediaTracksRelationState } from "../Data/store";
import { TimeSelector } from "./TimeSelector";
import { SECOND_WIDTH, TIMELINE_SECONDS } from "./consts";

const StyledTracksManuWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const StyledContainer = styled.div`
  width: 100%;
  display: flex;
`;

const TrackOptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const TrackContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: ${SECOND_WIDTH * TIMELINE_SECONDS}px;
  overflow-y: auto;
  position: relative;
`;

export const Timeline = () => {

  const [tracksList, setTracksList] = useRecoilState(tracksListState);
  const [, setMediaTracksRelation] = useRecoilState(mediaTracksRelationState(1));
  const [, setMediaTracksRelation2] = useRecoilState(mediaTracksRelationState(2));
  const [, setMediaTracksRelation3] = useRecoilState(mediaTracksRelationState(3));
  const [, setMediaTracksRelation4] = useRecoilState(mediaTracksRelationState(4));

  useEffect(() => {
    setTracksList([1, 2, 3, 4]);
    setMediaTracksRelation({action: 'addMediaToTrack', mediaData: { id: 'media1', start: 2, end: 20, type: 'text', title: 'Hello' }});
    setMediaTracksRelation({action: 'addMediaToTrack', mediaData: { id: 'media2', start: 21, end: 50, type: 'text', title: 'World'  }});
    setMediaTracksRelation2({action: 'addMediaToTrack', mediaData: { id: 'media21', start: 0, end: 10, type: 'image', title: 'Hero1.jpg', poster: 'https://res.cloudinary.com/dqsubx7oc/image/upload/v1556694637/samples/sheep.jpg' }});
    setMediaTracksRelation2({action: 'addMediaToTrack', mediaData: { id: 'media22', start: 10, end: 20, type: 'image', title: 'Hero2.jpg', poster: 'https://res.cloudinary.com/dqsubx7oc/image/upload/v1556694638/samples/bike.jpg' }});
    setMediaTracksRelation2({action: 'addMediaToTrack', mediaData: { id: 'media23', start: 20, end: 30, type: 'image', title: 'Hero3.jpg', poster: 'https://res.cloudinary.com/dqsubx7oc/image/upload/v1556694644/samples/landscapes/nature-mountains.jpg' }});
    setMediaTracksRelation3({action: 'addMediaToTrack', mediaData: { id: 'media31', start: 20, end: 60, type: 'video', title: 'background-video.mp4', poster: 'https://res.cloudinary.com/dqsubx7oc/video/upload/v1556694647/samples/sea-turtle.jpg' }});
    setMediaTracksRelation4({action: 'addMediaToTrack', mediaData: { id: 'media41', start: 0, end: 8, type: 'text', title: 'Dog', poster: 'https://res.cloudinary.com/dqsubx7oc/image/upload/v1581314730/Animals/ndvuacrmymiz94n2oatt.jpg' }});
    setMediaTracksRelation4({action: 'addMediaToTrack', mediaData: { id: 'media42', start: 9, end: 30, type: 'text', title: 'Cat', poster: 'https://res.cloudinary.com/dqsubx7oc/image/upload/v1586679163/Animals/maxresdefault_ic1kn8.jpg' }});
    setMediaTracksRelation4({action: 'addMediaToTrack', mediaData: { id: 'media43', start: 31, end: 50, type: 'text', title: 'Elephant', poster: 'https://res.cloudinary.com/dqsubx7oc/image/upload/v1631970340/Animals/qxyqxqjtu_WW187785_sbulbh.jpg' }});
  }, [ setTracksList, setMediaTracksRelation, setMediaTracksRelation2, setMediaTracksRelation3, setMediaTracksRelation4 ]);
  
  return (
    <StyledTracksManuWrapper>
      <StyledContainer>
        <TrackOptionsContainer>
          <TracksMenu />
          {tracksList.map((id) => {
            return <TrackOptions key={id} id={id} />;
          })}
        </TrackOptionsContainer>
        <TrackContainer>
          <TimeSelector />
          <TimeRuler />
          {tracksList.map((id) => {
            return <Track key={id} id={id} />;
          })}
        </TrackContainer>
      </StyledContainer>
    </StyledTracksManuWrapper>
  );
};
