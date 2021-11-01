import { throttle } from 'lodash';
import { RefObject, useCallback, useEffect, useState } from 'react';

const timing = (1 / 60) * 1000;
const decay = (v: number) => -0.1 * ((1 / timing) ^ 4) + v;

const useScrollBox = (scrollRef: RefObject<HTMLDivElement>) => {
  const [clickStartX, setClickStartX] = useState<number | null>(0);
  const [scrollStartX, setScrollStartX] = useState<number | null>(0);
  const [isDragging, setIsDragging] = useState(false);
  const [direction, setDirection] = useState(0);
  const [momentum, setMomentum] = useState(0);
  const [lastScrollX, setLastScrollX] = useState(0);
  const [speed, setSpeed] = useState(0);

  const handleLastScrollX = useCallback(
    throttle((screenX) => {
      setLastScrollX(screenX);
    }, timing),
    []
  );

  const handleMomentum = useCallback(
    throttle((nextMomentum) => {
      setMomentum(nextMomentum);
      if (scrollRef.current) {
        scrollRef.current.scrollLeft =
          scrollRef.current.scrollLeft + nextMomentum * timing * direction;
      }
    }, timing),
    [scrollRef.current, direction]
  );

  useEffect(() => {
    if (direction !== 0) {
      if (momentum > 0.1 && !isDragging) {
        handleMomentum(decay(momentum));
      } else if (isDragging) {
        setMomentum(speed);
      } else {
        setDirection(0);
      }
    }
  }, [momentum, isDragging, speed, direction, handleMomentum]);

  useEffect(() => {
    if (scrollRef.current) {
      const handleDragStart = (event: MouseEvent) => {
        setClickStartX(event.screenX);
        setScrollStartX(
          scrollRef.current ? scrollRef.current.scrollLeft : null
        );
        setDirection(0);
      };

      const handleDragMove = (event: MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();

        if (clickStartX !== null && scrollStartX !== null) {
          const touchDelta = clickStartX - event.screenX;
          if (scrollRef.current) {
            scrollRef.current.scrollLeft = scrollStartX + touchDelta;
          }

          if (Math.abs(touchDelta) > 1) {
            setIsDragging(true);
            setDirection(touchDelta / Math.abs(touchDelta));
            setSpeed(Math.abs((lastScrollX - event.screenX) / timing));
            handleLastScrollX(event.screenX);
          }
        }
      };

      const handleDragEnd = () => {
        if (isDragging && clickStartX !== undefined) {
          setClickStartX(null);
          setScrollStartX(null);
          setIsDragging(false);
        }
      };

      if (scrollRef.current.ontouchstart === undefined) {
        scrollRef.current.onmousedown = handleDragStart;
        scrollRef.current.onmousemove = handleDragMove;
        scrollRef.current.onmouseup = handleDragEnd;
        scrollRef.current.onmouseleave = handleDragEnd;
      }
    }
  }, [
    scrollRef.current,
    clickStartX,
    isDragging,
    scrollStartX,
    handleLastScrollX,
    lastScrollX,
  ]);

  return {
    clickStartX,
    scrollStartX,
    isDragging,
    direction,
    momentum,
    lastScrollX,
    speed,
  };
};

export default useScrollBox;
