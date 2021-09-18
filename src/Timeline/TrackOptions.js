import React from "react";
import styled from "styled-components";

const StyledTrackOptionskWrapper = styled.div`
    width: var(--tracks-options-width);
    height: var(--tracks-height);
    background-color: #DC4E00;
    border-bottom: 1px solid black;
    display: flex;
    align-items: center;
`;

const StyledControlsWrapper = styled.div`
    padding-left: 0.5rem;
`;

export const TrackOptions = ({ id, name }) => {
  return (
    <StyledTrackOptionskWrapper>
      <StyledControlsWrapper>{name}</StyledControlsWrapper>
    </StyledTrackOptionskWrapper>
  );
};
