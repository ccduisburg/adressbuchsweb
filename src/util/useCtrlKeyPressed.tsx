import { useState, useEffect } from 'react';

export default function useCtrlKeyPressed() {
  // State for keeping track of whether key is pressed
  const [keyPressed, setKeyPressed] = useState(false);

  // If pressed key is our target key then set to true
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const downHandler = ({ ctrlKey }: KeyboardEvent) => {
    setKeyPressed(ctrlKey);
  };

  // If released key is our target key then set to false
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const upHandler = ({ ctrlKey }: KeyboardEvent) => {
    setKeyPressed(ctrlKey);
  };

  // Add event listeners
  useEffect(() => {
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, [downHandler, upHandler]); // Empty array ensures that effect is only run on mount and unmount

  return keyPressed;
}