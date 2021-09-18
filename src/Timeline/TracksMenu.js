import React from "react";
import styled from "styled-components";

const StyledTrackMenuWrapper = styled.div`
    width: var(--tracks-options-width);
    height: 40px;
    background-color: #929487;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Title = styled.div`
    padding-left: 0.5rem;
`;

const Controls = styled.div`
    display: flex;
    align-items: center; 
    padding-right: 1rem;
`;

const Button = styled.button`
    background-color: transparent;
    border: 0;
    cursor: pointer;
`;

export const TracksMenu = () => {
  return (
    <StyledTrackMenuWrapper>
      <Title>Tracks list</Title>
      <Controls>
          <Button>➕</Button>
      </Controls>
    </StyledTrackMenuWrapper>
  );
};
