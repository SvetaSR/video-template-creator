import { useRef, useState, useEffect, useCallback } from "react";

export const useDrag = (direction, step = 1) => {
    const handleRef = useRef(null);
    const [isDragging, setisDragging] = useState(false);
    const [distance, setDistance] = useState(0);

    const mouseXPos = useRef(null);
    
    const onMouseDownHandler = useCallback(
        e => {
          mouseXPos.current = e.clientX;
          setisDragging(true);
          e.preventDefault();
        },
        [setisDragging]
      );
    
      const onMouseUpHandler = useCallback(
        e => {
          setisDragging(false);
          mouseXPos.current = null;
          e.preventDefault();
        },
        [setisDragging]
      );
    
      const onMouseMoveHandler = useCallback(
        (e) => {
            e.preventDefault();
            if (!isDragging || !handleRef) return;
            switch(direction) {
              case 'horizontal':
                const mouseMoveDirection = e.clientX - mouseXPos.current;
                setDistance( mouseMoveDirection );
                if (mouseMoveDirection > step - 1 || mouseMoveDirection < (-1 * (step - 1))) {
                  mouseXPos.current = e.clientX;
                }
                break;
              default:
                console.warn(`${direction} direction is not supported`)
            }
        },
        [direction, isDragging, handleRef, step]
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

      return { bodyRef: setHandleRef, isDragging, distance };
}
