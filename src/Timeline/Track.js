import React from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { Media } from './Media';
import { SECOND_WIDTH, TIMELINE_SECONDS } from "./consts";
import { mediaTracksRelationState } from "../Data/store";

const StyledTrackWrapper = styled.div`
    width: ${SECOND_WIDTH * TIMELINE_SECONDS}px;
    height: var(--tracks-height);
    background-color: #929487;
    border-bottom: 1px solid black;
    position: relative;
    display: flex;
    align-items: center;
`;

export const Track = ({ id }) => {
    const [media] = useRecoilState(mediaTracksRelationState(id));
    return (
        <StyledTrackWrapper>
            {media.map(({ id, prevMediaEnd, nextMediaStart }) => {
                return <Media key={id} id={id} prevMediaEnd={prevMediaEnd} nextMediaStart={nextMediaStart} />;
            })}
        </StyledTrackWrapper>
    )
};
