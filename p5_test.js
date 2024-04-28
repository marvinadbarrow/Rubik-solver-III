import {testFunction} from 'https://inaridarkfox4231.github.io/src/testModule.js'
const f = testFunction;
console.log(f);



const v = f(2,3,4);
const mainSketch = (p) => {
  p.setup = () => {
    p.createCanvas(400, 400);
    console.log(v);
  }
  p.draw = () => {
    p.background(188);
  }
}

// export default mainSketch;