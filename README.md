# Cat Attack

Cat Attack is [Waverley Leung](https://github.com/wlcreate)'s submission of the TTP Take-Home Coding Challenge for `Challenge #1 - Infinite-Scroll`. The challenge was received on Monday, June 21st with a deadline of Wednesday, June 23rd and was submitted on Tuesday, June 22nd.

😸 Link to the [deployed site](https://wlcreate.github.io/TTP-Infinite-Scroll/) 😸

## Description

Based on the challenge prompt inspired by Pinterest, Cat Attack implements the infinite scroll feature. Through a given (JSON) dataset of Pinterest Pins, users are able to browse the pins and once all pins are viewed, repeats from the beginning the pins as needed. I have executed this by creating a custom hook, `useInfiniteScroll`, to allow for this feature to be easily reused in other pages.

![Demo gif of Cat Attack's infinite scrolling feature](./demo/Cat-Attack.gif)

## Tech Stack

- [React](https://reactjs.org)
- CSS

## Getting Started

### Dependencies

- Node Package Manager (`npm`)
- Node.js

Follow the [instructions here to install Node.js and `npm`](https://nodejs.org/en/). Note that `npm` is distributed with Node.js which means that when you download Node.js, you automatically get `npm` installed on your computer.

### Installing

- Clone down this repo locally with the following command in your terminal:

```bash
git clone
```

- `cd` into the directory
- Install all dependencies:

```bash
npm install
```

### Executing program

- Run the server:

```bash
npm start
```

- Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Solution formulation

`useInfiniteScroll` uses `useEffect`, `useState`, `useRef`, `useCallback`, and the Intersection Observer API to implement the infinite scroll behavior. It is then used in `App.js`, which passes to it `data` and `numPinsToGet`. In turn, `App.js` is returned the `pins` to display and the `lastPinRef` to attach to the last pin.

`useInfiniteScroll` implements infinite scrolling by:

- displaying a certain number of pins
- attaching a reference to the last pin
- once that pin is visible (with `isIntersecting`), updates `numDisplayedResults`
- once `numDisplayedResults` is updated, through `useEffect`, renders more pins

I decided to have `data` and `numPinsToGet` as arguments in order to make the hook more reusable. If I left `data` within the hook, the hook becomes dependent on that specific data. This is similar to `numPinsToGet`, where if left within the hook, everywhere it is used would need to render the same number of pins at a time. Therefore, by taking them out of the hook the developer can change what data is being used as well as how many to display at a time.

## How to use `useInfiniteScroll`

To use `useInfiniteScroll`, the file with the hook must be imported and then invoked in the page/component for the feature. For the page invoking `useInfiniteScroll`, the `data` and `numPinsToGet` must be passed to it. To display the pins and implement the feature, simply destructure `pins` and `lastPinRef`.

```
const { pins, lastPinRef } = useInfiniteScroll(data, numPinsToGet);
```

The `pins` can then be displayed as wished, however please note that in order to execute the next call of pins (the infinite scrolling) `lastPinRef` must be attached to the last rendered pin, which can be accomplished with a check:

```
{pins &&
    pins.map((pin, index) => {
    if (pins.length === index + 1) {
        return (
            <div ref={lastPinRef} key={index}>
                ...
            </div>
        );
    } else {
        return (
            <div key={index}>
                ...
            </div>
        );
    }
})}
```

## Acknowledgments

- [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
- [Hooks API Reference](https://reactjs.org/docs/hooks-reference.html)
- [Web Dev Simplified's Infinite Scrolling with React](https://www.youtube.com/watch?v=NZKUirTtxcg)
- [Deploying to GitHub Pages](https://dzone.com/articles/how-to-deploy-react-apps-for-free-with-github-page)
- [Deploying to GitHub Pages from CRA](https://create-react-app.dev/docs/deployment/#github-pages)
