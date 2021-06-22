import "./App.css";
import data from "./data/nyc_ttp_pins.json";
import useInfiniteScroll from "./hooks/useInfiniteScroll";

function App() {
  const numPinsToGet = 12;
  const { pins, lastPinRef } = useInfiniteScroll(data, numPinsToGet);

  return (
    <div>
      <h1 className="heading">🐾 Cat Attack 🐾</h1>

      <p className="pin-number">Current number of pins: {pins.length}</p>

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
                  <p className="card-pinner">
                    <span>Pinner</span>: {pin.pinner.username}
                  </p>
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
                  <p className="card-pinner">
                    <span>Pinner</span>: {pin.pinner.username}
                  </p>
                </div>
              );
            }
          })}
      </div>
    </div>
  );
}

export default App;
