import { useEffect } from 'react';

const useFocusTrap = (firstElemRef, lastElemRef, isActive = true) => {
  /* eslint-disable-next-line consistent-return */
  useEffect(() => {
    const handleTabPress = ($event) => {
      if ($event.key === 'Tab') {
        if ($event.shiftKey) {
          // tabbing backwards, check whether first element is focused
          if (firstElemRef.current === document.activeElement) {
            $event.preventDefault();
            lastElemRef.current.focus();
          }
        }
        // tabbing forwards, check whether last element is focused
        else if (lastElemRef.current === document.activeElement) {
          $event.preventDefault();
          firstElemRef.current.focus();
        }
      }
    };
    if (isActive) {
      window.addEventListener('keydown', handleTabPress);
      return () => {
        window.removeEventListener('keydown', handleTabPress);
      };
    }
  }, [firstElemRef, lastElemRef, isActive]);
};

export default useFocusTrap;