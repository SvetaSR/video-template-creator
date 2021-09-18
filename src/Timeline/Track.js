import React from "react";
import styled from "styled-components";
import { Media } from './Media';
import { SECOND_WIDTH, TIMELINE_SECONDS } from "./consts";

const StyledTrackWrapper = styled.div`
    width: ${SECOND_WIDTH * TIMELINE_SECONDS}px;
    height: var(--tracks-height);
    background-color: #929487;
    border-bottom: 1px solid black;
    position: relative;
    display: flex;
    align-items: center;
`;

export const Track = ({ media }) => {
    return (
        <StyledTrackWrapper>
            {media.map(({ id, title, start, end, poster }, index) => {
                const prevMediaEnd = index === 0 ? 0 : media[index - 1].end;
                const nextMediaStart = (index === media.length - 1) ? 60 : media[index + 1].start;
                return <Media key={id} title={title} start={start} end={end} poster={poster} prevMediaEnd={prevMediaEnd} nextMediaStart={nextMediaStart} />;
            })}
        </StyledTrackWrapper>
    )
};
