import React, { useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { useResize } from "../Common/useResize";
import { useDrag } from "../Common/useDrag";
import { mediaState } from "../Data/store";
import { SECOND_WIDTH } from "./consts";

const StyledMediaWrapper = styled.div.attrs(props => ({
    style: { width: props.width, left: props.left }
  }))`
    position: absolute;
    background-color: #89CEDE;
    height: 80%;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow:inset 0px 0px 0px 2px #6d6d6d;
    overflow: hidden;
`;

const LeftDrag = styled.div`
  width: 5px;
  height: 100%;
  position: absolute;
  cursor: e-resize;
  background-color: #49a2b7;
  left: 0;
`;

const RightDrag = styled.div`
  width: 5px;
  height: 100%;
  position: absolute;
  cursor: e-resize;
  background-color: #49a2b7;
  right: 0;
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 90%;
  cursor: move;
  ${({ poster }) => (poster && `
    background-image: url(${poster});
    background-size: contain;
  `)}
`;

export const Media = ({ id, prevMediaEnd, nextMediaStart }) => {
    const [media, setMedia] = useRecoilState(mediaState(id));
    const {start, end, title, poster} = media;
    const containerRef = useRef(null);
    const width = (end - start) * SECOND_WIDTH;
    const leftPosition = start * SECOND_WIDTH;

    const {handleRef: handleRefLeft, isDragging: isDraggingLeft, distance: distanceLeft} = useResize('left', containerRef);
    const {handleRef: handleRefRight, isDragging: isDraggingRight, distance: distanceRight} = useResize('right', containerRef);    
    const {bodyRef, isDragging, distance} = useDrag('horizontal', SECOND_WIDTH);

    useEffect(() => {
        if (isDraggingRight && distanceRight > -1) {
            const newEnd = Math.ceil(distanceRight / SECOND_WIDTH) + start;
            if (newEnd <= nextMediaStart) {
              setMedia((media) => ({...media, end: newEnd}));
            }
        }
    }, [isDraggingRight, distanceRight, start, nextMediaStart, setMedia]);

    useEffect(() => {
        if (isDraggingLeft && distanceLeft > -1) {
            const newStart = end - Math.ceil(distanceLeft / SECOND_WIDTH);
            if (newStart >= prevMediaEnd) {
              setMedia((media) => ({...media, start: newStart}));
            }
        }
    }, [isDraggingLeft, distanceLeft, end, prevMediaEnd, setMedia]);

    useEffect(() => {
        if (isDragging && Math.floor(Math.abs(distance) / SECOND_WIDTH) > 0) {
            // drag right
            if (distance > 0) {
              setMedia((prevMedia) => {
                if (prevMedia.end + 1 <= nextMediaStart) {
                  return {...prevMedia, end: prevMedia.end + 1, start: prevMedia.start + 1}
                }
                return prevMedia;
              });
            // drag left
            } else if (distance < 0) {
              setMedia((prevMedia) => {
                if (prevMedia.start - 1 >= prevMediaEnd) {
                  return {...prevMedia, end: prevMedia.end - 1, start: prevMedia.start - 1}
                }
                return prevMedia;
              });
            }
        }
    }, [isDragging, distance, setMedia, prevMediaEnd, nextMediaStart]);

    return (
        <StyledMediaWrapper left={leftPosition} width={width} ref={containerRef}>
            <LeftDrag ref={handleRefLeft} />
            <Content ref={bodyRef} poster={poster}>{!poster && title}</Content>
            <RightDrag ref={handleRefRight} />
        </StyledMediaWrapper>
    )
}