import React, { useCallback } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { trackOptionsState, tracksListState } from "../Data/store";

const StyledTrackOptionskWrapper = styled.div`
    width: var(--tracks-options-width);
    height: var(--tracks-height);
    background-color: #DC4E00;
    border-bottom: 1px solid black;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const StyledControlsWrapper = styled.div`
    padding-left: 0.5rem;
`;

const Controls = styled.div`
    display: flex;
    align-items: center; 
    padding-right: 1rem;
`;

const Button = styled.button`
    border: 0;
    cursor: pointer;
    background: transparent;
`;

export const TrackOptions = ({ id }) => {
  const [trackMetadata] = useRecoilState(trackOptionsState(id));
  const setTracksList = useSetRecoilState(tracksListState);
  const { name } = trackMetadata;

  const deleteTrack = useCallback(() => {
    setTracksList((prevList) => prevList.filter((trackId) => trackId !== id));
  }, [id, setTracksList]);

  return (
    <StyledTrackOptionskWrapper>
      <StyledControlsWrapper>{name}</StyledControlsWrapper>
      <Controls>
          <Button onClick={deleteTrack}>🗑️</Button>
      </Controls>
    </StyledTrackOptionskWrapper>
  );
};
