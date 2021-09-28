import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { useDrag } from '../Common/useDrag';
import { currentTimeState } from '../Data/store';
import { SECOND_WIDTH, TIMELINE_SECONDS } from './consts';


const SELECTOR_BORDER = 5;

const Selector = styled.div`
  position: absolute;
  left: ${({ currentTime }) => -SELECTOR_BORDER + currentTime * SECOND_WIDTH}px;
  top: 0;
  width: 1px;
  height: 100%;
  background-color: red;
  z-index: 2;
  cursor: e-resize;
  border-right: ${SELECTOR_BORDER}px solid transparent;
  border-left: ${SELECTOR_BORDER}px solid transparent;
  background-clip: padding-box;

  &:after {
    content: "";
    position: absolute;
    left: -10px;
    top: 0px;
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid red;
    clear: both;
  }
`;

export const TimeSelector = () => {
    const {bodyRef, isDragging, distance} = useDrag('horizontal', SECOND_WIDTH);
    const [currentTime, setCurrentTime] = useRecoilState(currentTimeState);

    console.log(currentTime);

    useEffect(() => {
        if (isDragging && Math.floor(Math.abs(distance) / SECOND_WIDTH) > 0) {
            // drag right
            if (distance > 0) {
              setCurrentTime((prevTime) => (prevTime === TIMELINE_SECONDS) ? prevTime : prevTime + 1);
            // drag left
            } else if (distance < 0) {
                setCurrentTime((prevTime) => prevTime === 0 ? prevTime : prevTime - 1);
            }
        }
    }, [isDragging, distance, setCurrentTime]);


    return <Selector ref={bodyRef} currentTime={currentTime} />
}