import "./App.css";
import data from "./InfiniteScroll/nyc_ttp_pins.json";
import useInfiniteScroll from "./InfiniteScroll/useInfiniteScroll";

function App() {
  const numPinsToGet = 12;
  const { pins, lastPinRef } = useInfiniteScroll(data, numPinsToGet);

  return (
    <div>
      <h1 className="heading">TTP Infinite Scroll</h1>

      <div className="grid">
        {pins &&
          pins.map((pin, index) => {
            if (pins.length === index + 1) {
              return (
                <div ref={lastPinRef} key={index} className="card">
                  <img
                    src={pin.images["236x"].url}
                    alt={pin.pin_join.visual_descriptions[0]}
                    className="card-image"
                  />
                  <p>Pinner: {pin.pinner.username}</p>
                </div>
              );
            } else {
              return (
                <div key={index} className="card">
                  <img
                    src={pin.images["236x"].url}
                    alt={pin.pin_join.visual_descriptions[0]}
                    className="card-image"
                  />
                  <p>Pinner: {pin.pinner.username}</p>
                </div>
              );
            }
          })}
      </div>
    </div>
  );
}

export default App;
