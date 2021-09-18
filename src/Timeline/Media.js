import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useResize } from "../Common/useResize";
import { useDrag } from "../Common/useDrag";
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

export const Media = ({ title, start, end, poster, prevMediaEnd, nextMediaStart }) => {
    const containerRef = useRef(null);
    const [testStart, setTestStart] = useState(start);
    const [testEnd, setTestEnd] = useState(end);
    const width = (testEnd - testStart) * SECOND_WIDTH;
    const leftPosition = testStart * SECOND_WIDTH;

    const {handleRef: handleRefLeft, isDragging: isDraggingLeft, distance: distanceLeft} = useResize('left', containerRef);
    const {handleRef: handleRefRight, isDragging: isDraggingRight, distance: distanceRight} = useResize('right', containerRef);    
    const {bodyRef, isDragging, distance} = useDrag('horizontal', SECOND_WIDTH);

    useEffect(() => {
        if (isDraggingRight && distanceRight > -1) {
            const newEnd = Math.ceil(distanceRight / SECOND_WIDTH) + testStart;
            if (newEnd <= nextMediaStart) {
              setTestEnd(newEnd);
            }
        }
    }, [isDraggingRight, distanceRight, testStart, nextMediaStart]);

    useEffect(() => {
        if (isDraggingLeft && distanceLeft > -1) {
            const newStart = testEnd - Math.ceil(distanceLeft / SECOND_WIDTH);
            if (newStart >= prevMediaEnd) {
              setTestStart(newStart);
            }
        }
    }, [isDraggingLeft, distanceLeft, testEnd, prevMediaEnd]);

    useEffect(() => {
        if (isDragging && Math.floor(Math.abs(distance) / SECOND_WIDTH) > 0) {
            // drag right
            if (distance > 0) {
              setTestEnd((prevEnd) => {
                if (prevEnd + 1 <= nextMediaStart) {
                  setTestStart((prevStart) => prevStart + 1);
                  return prevEnd + 1;
                }
                return prevEnd;
              });
            // drag left
            } else if (distance < 0) {
              setTestStart((prevStart) => {
                if (prevStart - 1 >= prevMediaEnd) {
                  setTestEnd((prevEnd) => {
                    return prevEnd - 1;
                  });
                  return prevStart - 1;
                }
                return prevStart;
              });
            }
        }
    }, [isDragging, distance, prevMediaEnd, nextMediaStart]);

    return (
        <StyledMediaWrapper left={leftPosition} width={width} ref={containerRef}>
            <LeftDrag ref={handleRefLeft} />
            <Content ref={bodyRef} poster={poster}>{!poster && title}</Content>
            <RightDrag ref={handleRefRight} />
        </StyledMediaWrapper>
    )
}