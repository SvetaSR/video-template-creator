import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { SECOND_WIDTH, TIMELINE_SECONDS } from './consts';

const Canvas = styled.canvas`
    height: 40px;
    width: ${SECOND_WIDTH * TIMELINE_SECONDS}px;
`;

const drawTimeline = (duration, ctx) => {
    ctx.lineWidth = 1;
    ctx.translate(0.5, 0.5);
    const timePoints = duration * 5;

    ctx.strokeStyle = "#000";
    ctx.fillStyle = "#000";
    ctx.font = "10px Arial";

    for (let i = 0; i < timePoints; i++) {
      const x = i * SECOND_WIDTH;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      if (i % 10 === 0) {
        ctx.lineTo(x, 20.5);
        ctx.fillText(`00:00:${i === 0 ? '00': i}`, x - 20, 30.5);
      } else {
        ctx.lineTo(x, i % 5 === 0 ? 15.5 : 10.5);
      }
      ctx.stroke();
    }
  };

export const TimeRuler = React.memo(() => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d');

        context.fillStyle = '#89CEDE';
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);

        drawTimeline(60, context);
      }, []);

    return <Canvas ref={canvasRef} height={40} width={SECOND_WIDTH * TIMELINE_SECONDS} />;
});