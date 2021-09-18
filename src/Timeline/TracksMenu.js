import React from "react";
import styled from "styled-components";
import { TrackOptions } from "./TrackOptions";
import { Track } from "./Track";
import { Timeline } from "./Timeline";

const StyledTracksManuWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const StyledTracksWrapper = styled.div`
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
  width: calc(100% - var(--tracks-options-width));
  overflow-y: auto;
  position: relative;
`;

const track1 = {
  id: 'track1',
  name: 'Track',
  media: [
    { id: '1', start: 2, end: 20, type: 'text', title: 'Hello' },
    { id: '2', start: 21, end: 50, type: 'text', title: 'World' },
  ]
};

const track2 = {
  id: 'track2',
  name: 'Track (2)',
  media: [
    { id: '1', start: 0, end: 10, type: 'image', title: 'Hero1.jpg', poster: 'https://res.cloudinary.com/dqsubx7oc/image/upload/v1556694637/samples/sheep.jpg' },
    { id: '2', start: 10, end: 20, type: 'image', title: 'Hero2.jpg', poster: 'https://res.cloudinary.com/dqsubx7oc/image/upload/v1556694638/samples/bike.jpg' },
    { id: '3', start: 20, end: 30, type: 'image', title: 'Hero3.jpg', poster: 'https://res.cloudinary.com/dqsubx7oc/image/upload/v1556694644/samples/landscapes/nature-mountains.jpg' },
  ]
};

const track3 = {
  id: 'track3',
  name: 'Track (3)',
  media: [
  { id: '1', start: 20, end: 60, type: 'video', title: 'background-video.mp4', poster: 'https://res.cloudinary.com/dqsubx7oc/video/upload/v1556694647/samples/sea-turtle.jpg' },
]};

const track4 = {
  id: 'track4',
  name: 'Track (4)',
  media: [
  { id: '1', start: 0, end: 8, type: 'text', title: 'Dog', poster: 'https://res.cloudinary.com/dqsubx7oc/image/upload/v1581314730/Animals/ndvuacrmymiz94n2oatt.jpg' },
  { id: '2', start: 9, end: 30, type: 'text', title: 'Cat', poster: 'https://res.cloudinary.com/dqsubx7oc/image/upload/v1586679163/Animals/maxresdefault_ic1kn8.jpg' },
  { id: '3', start: 31, end: 50, type: 'text', title: 'Elephant', poster: 'https://res.cloudinary.com/dqsubx7oc/image/upload/v1631970340/Animals/qxyqxqjtu_WW187785_sbulbh.jpg' },
]};

const tracks = [track1, track2, track3, track4];

export const TracksMenu = () => {
  return (
    <StyledTracksManuWrapper>
      <Timeline />
      <StyledTracksWrapper>
        <TrackOptionsContainer>
          {tracks.map(({ id, name }) => {
            return <TrackOptions key={id} id={id} name={name} />;
          })}
        </TrackOptionsContainer>
        <TrackContainer>
          {tracks.map(({ id, media }) => {
            return <Track key={id} id={id} media={media} />;
          })}
        </TrackContainer>
      </StyledTracksWrapper>
    </StyledTracksManuWrapper>
  );
};
