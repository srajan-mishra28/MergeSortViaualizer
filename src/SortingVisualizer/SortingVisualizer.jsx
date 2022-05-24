import React, { setState, useState } from "react";
import { render } from "react-dom";
import { getMergeSortAnimations } from "../SortingFunctions/sortingAnimations";
import "./SortingVisualizer.css";

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 100;

// This is the main color of the array bars.
const PRIMARY_COLOR = "blue";

// This is the  color of array bars when they are being compared
const SECONDARY_COLOR = "red";

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [],
      speed: 30
    };
  }
  componentDidMount() {
    this.resetArray();
  }

  //   setDefaultState = () => {
  //     this.setState({
  //         array: [],
  //         speed: 20
  //     });
  // }

  resetArray = () => {
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntInInterval(5, 500));
    }
    this.setState({ array });
  };

  mergeSort = () => {
    //console.log(this.speed);
    const animations = getMergeSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * this.speed);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * this.speed);
      }
    }
  };

  render() {
    const { array } = this.state;
    return (
      <div className="complete-container">
        <div className="buttons">
          <div>
            <button id="generate-array-buton" onClick={this.resetArray}>
              Generate New Array
            </button>
          </div>
          <div>
            Sorting Speed
            <input
              type="range"
              min="1"
              max="30"
              className="slider"
              id="animation-speed-slider"
              onChange={(event) => {
                this.speed = event.target.value;
              }}
            ></input>
          </div>
          <div>
            <button id="merge-sort" onClick={this.mergeSort}>
              MergeSort
            </button>
          </div>
        </div>
        <div className="array-container">
          {array.map((value, idx) => (
            <div
              className="array-bar"
              key={idx}
              style={{ height: `${value}px` }}
            ></div>
          ))}
        </div>
      </div>
    );
  }
}

function randomIntInInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
