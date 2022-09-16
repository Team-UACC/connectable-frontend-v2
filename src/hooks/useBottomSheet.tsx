/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef } from 'react';

import { useBottomSheetModalStore } from '~/stores/bottomSheetModal';

interface BottomSheetMetrics {
  touchStart: {
    sheetHeight: number; // sheet 높이
    touchY: number; // touchstart에서 터치 포인트의 Y값
  };
  touchMove: {
    prevTouchY?: number; // 다음 touchmove 이벤트 핸들러에서 필요한 터치 포인트 Y값을 저장
    movingDirection: 'none' | 'down' | 'up'; // 유저가 터치를 움직이고 있는 방향
  };
}

export function useBottomSheet() {
  const sheetRef = useRef<HTMLDivElement>(null);

  const { hideBottomSheetModal } = useBottomSheetModalStore();

  const metrics = useRef<BottomSheetMetrics>({
    touchStart: {
      sheetHeight: 0,
      touchY: 0,
    },
    touchMove: {
      prevTouchY: 0,
      movingDirection: 'none',
    },
  });

  const setOpen = useCallback(() => {
    sheetRef.current?.style.setProperty('transform', `translateY(0)`);
  }, []);
  const setClose = useCallback(() => {
    sheetRef.current?.style.setProperty('transform', 'translateY(100%)');
  }, []);

  // Touch Event 핸들러들을 등록한다.
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      const { touchStart } = metrics.current;

      touchStart.sheetHeight = sheetRef.current!.offsetHeight;
      touchStart.touchY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();

      const { touchStart, touchMove } = metrics.current;
      const currentTouch = e.touches[0];

      if (touchMove.prevTouchY === undefined) {
        touchMove.prevTouchY = touchStart.touchY;
      }

      if (touchMove.prevTouchY < currentTouch.clientY && currentTouch.clientY - touchStart.touchY > 64) {
        touchMove.movingDirection = 'down';
      } else {
        touchMove.movingDirection = 'up';
      }

      // 터치 시작점에서부터 현재 터치 포인트까지의 변화된 y값
      const touchOffset = currentTouch.clientY - touchStart.touchY;
      const nextSheetRatio = Math.floor((touchOffset / touchStart.sheetHeight) * 100);

      // sheet 위치 갱신. 0%보다는 아래로 내려가지 않도록
      sheetRef.current!.style.setProperty('transform', `translateY(${Math.max(0, nextSheetRatio)}%)`);

      touchMove.prevTouchY = currentTouch.clientY;
    };

    const handleTouchEnd = () => {
      const { touchMove } = metrics.current;

      if (touchMove.movingDirection === 'down') {
        setClose();
        hideBottomSheetModal();
      }

      if (touchMove.movingDirection === 'up') {
        setOpen();
      }

      // metrics 초기화.
      metrics.current = {
        touchStart: {
          sheetHeight: 0,
          touchY: 0,
        },
        touchMove: {
          prevTouchY: 0,
          movingDirection: 'none',
        },
      };
    };

    sheetRef.current?.addEventListener('touchstart', handleTouchStart);
    sheetRef.current?.addEventListener('touchmove', handleTouchMove);
    sheetRef.current?.addEventListener('touchend', handleTouchEnd);

    return () => {
      sheetRef.current?.removeEventListener('touchstart', handleTouchStart);
      sheetRef.current?.removeEventListener('touchmove', handleTouchMove);
      sheetRef.current?.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return { sheetRef, setOpen, setClose };
}
