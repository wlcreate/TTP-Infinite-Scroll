import { useEffect, useState, useRef, useCallback } from "react";

export default function useInfiniteScroll(data, numPinsToGet) {
  const [pins, setPins] = useState([]);
  const [numDisplayedResults, setNumDisplayedResults] = useState(0);
  const observer = useRef();

  console.log(pins.length);

  useEffect(() => {
    if (numDisplayedResults === 0) {
      const firstPins = data.filter((pin, index) => {
        return index < numPinsToGet;
      });
      setPins(firstPins);
    } else if (numDisplayedResults >= data.length) {
      let repeatedPins = [];

      while (repeatedPins.length + data.length < numDisplayedResults) {
        repeatedPins.push(...data);
      }

      const numLeftoverPins = numDisplayedResults - repeatedPins.length;
      const leftoverPins = data.filter((pin, index) => {
        return index < numLeftoverPins;
      });

      setPins([...repeatedPins, ...leftoverPins]);
    } else {
      const updatedPins = data.filter((pin, index) => {
        return index < numDisplayedResults;
      });

      setPins(updatedPins);
    }
  }, [numDisplayedResults, data, numPinsToGet]);

  // every time a new last pin is created this callback is invoked with a reference to that last pin
  const lastPinRef = useCallback(
    (pin) => {
      // will be null first time so when there is a current ref, disconnect the observer from the previous element so new last element can be connected correctly
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setNumDisplayedResults(numDisplayedResults + numPinsToGet);
          }
        },
        { threshold: 1.0 }
      );

      if (pin) observer.current.observe(pin);
    },
    [numDisplayedResults, numPinsToGet]
  );

  return { pins, lastPinRef };
}
