import "./App.css";
import data from "./InfiniteScroll/nyc_ttp_pins.json";
import useInfiniteScroll from "./InfiniteScroll/useInfiniteScroll";

function App() {
  const numPinsToGet = 12;
  const { pins, lastPinRef } = useInfiniteScroll(data, numPinsToGet);

  return (
    <div>
      <h1>TTP Infinite Scroll</h1>

      {pins &&
        pins.map((pin, index) => {
          if (pins.length === index + 1) {
            return (
              <div ref={lastPinRef} key={index}>
                <img src={pin.images["236x"].url} alt="" />
                <p>{pin.title}</p>
                <p>Pinner: {pin.pinner.username}</p>
              </div>
            );
          } else {
            return (
              <div key={index}>
                <img src={pin.images["236x"].url} alt="" />
                <p>{pin.title}</p>
                <p>Pinner: {pin.pinner.username}</p>
              </div>
            );
          }
        })}
    </div>
  );
}

export default App;
