import { useEffect, useState, useRef, useCallback } from "react";
import data from "./nyc_ttp_pins.json";

export default function useInfiniteScroll() {
  const observer = useRef();
  const [pins, setPins] = useState([]);
  const [numDisplayedResults, setNumDisplayedResults] = useState(0);
  const numPinsToGet = 12;

  useEffect(() => {
    if (numDisplayedResults === 0) {
      const firstPins = data.filter((pin, index) => {
        return index < numPinsToGet;
      });
      setPins(firstPins);
    } else {
      const updatedPins = data.filter((pin, index) => {
        return index < numDisplayedResults;
      });

      setPins(updatedPins);
    }
  }, [numDisplayedResults, numPinsToGet]);

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
