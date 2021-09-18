import { useRef, useState, useEffect, useCallback } from "react";

export const useResize = (direction, containerRef) => {
    const handleRef = useRef(null);
    const [isDragging, setisDragging] = useState(false);
    const [distance, setDistance] = useState(-1);
    
    const onMouseDownHandler = useCallback(
        e => {
          setisDragging(true);
          e.preventDefault();
        },
        [setisDragging]
      );
    
      const onMouseUpHandler = useCallback(
        e => {
          setisDragging(false);
          e.preventDefault();
        },
        [setisDragging]
      );
    
      const onMouseMoveHandler = useCallback(
        (e) => {
            e.preventDefault();
            if (!isDragging || !containerRef) return;
            switch(direction) {
              case 'right':
                // Dragging container by right border. The new width is the distance between the left border and mouse x position
                setDistance( e.clientX - containerRef.current.getBoundingClientRect().left);
                break;
              case 'left':
                // Dragging container by left border. The new width is the distance between the right border and mouse x position
                setDistance( containerRef.current.getBoundingClientRect().right - e.clientX);
                break;
              default:
                console.warn(`${direction} direction is not supported`)
            }
        },
        [direction, isDragging, containerRef]
      );
    
      useEffect(() => {
        document.addEventListener("mousemove", onMouseMoveHandler);
        document.addEventListener("mouseup", onMouseUpHandler);
        return () => {
          document.removeEventListener("mousemove", onMouseMoveHandler);
          document.addEventListener("mouseup", onMouseUpHandler);
        };
      }, [onMouseMoveHandler, onMouseUpHandler]);

      const setHandleRef = useCallback(node => {
        if (handleRef.current) {
          handleRef.current.removeEventListener("mousedown", onMouseDownHandler);
        }
        if (node) {
          node.addEventListener("mousedown", onMouseDownHandler);
        }
        handleRef.current = node;
      }, [onMouseDownHandler]);

      return {handleRef: setHandleRef, isDragging, distance};
}
