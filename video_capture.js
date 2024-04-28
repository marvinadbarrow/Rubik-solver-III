let tolerance;
let myVideo;
let matchColor;
let colors;
let regionArray = []
let colorsArray = []
let redValuesArr = []
let greenValuesArr = []
let blueValuesArr = []
let scannArray = []
// import function which is used to send back face data to the main js file
import { cameraColours } from "./script_layout_2.js";


function resetFacets(){
    scannArray.push('scanning')
    tempFaceFacets = [[], [], []]
}

// export a function which allows the main js module to change clear the tempFacet array

//holds facet colors of current face prior to determining which face is being examined
let tempFaceFacets = [[], [], []] 
let faceYellow = [], faceGreen = [],  faceOrange = [],  faceBlue = [],  faceRed = [],  faceWhite = []


// for the nine regions, each representing one of the facets of a face
class Region{
    constructor(xStart, xEnd, yStart, yEnd){
this.x0 = xStart;
this.x1 = xEnd;
this.y0 = yStart;
this.y1 = yEnd;
    }
}

// for 6 colored faces of the cube
class FaceColors{
    constructor(name, r, g, b){
        this._colorName = name
        this.red = r;
        this.green = g;
        this.blue = b;
    }
}

// let myCanvas = document.getElementById('camera-canvas')

new p5(function(p5){


    p5.setup = function(){

// set six colors of cube faces
colorsArray.push(new FaceColors('red', 240, 130, 120))
colorsArray.push(new FaceColors('orange', 255 , 180, 144))
colorsArray.push(new FaceColors('green', 142, 202, 70))
colorsArray.push(new FaceColors('blue', 0, 125, 87))
colorsArray.push(new FaceColors('white', 201, 202, 204))
colorsArray.push(new FaceColors('yellow', 226, 194, 75))
console.log(colorsArray)

// create and push region objects for color detection       
regionArray.push(new Region(75, 85, 75, 85))
regionArray.push(new Region(185, 195, 75, 85))
regionArray.push(new Region(295, 305, 75, 85))
regionArray.push(new Region(75, 85, 185, 195))
regionArray.push(new Region(185, 195, 185, 195))
regionArray.push(new Region(295, 305, 185, 195))
regionArray.push(new Region(75, 85, 295, 305))
regionArray.push(new Region(185, 195, 295, 305))
regionArray.push(new Region(295, 305, 295, 305))
        console.log(regionArray)

        // console.log(p5.filter(GRAY))
        // p5.rect(100, 100, 10, 10)
myVideo = p5.createCapture(p5.VIDEO)
myVideo.id('my-video')
let myCanvas =  p5.createCanvas(400, 400)
myVideo.parent('#defaultCanvas0')
myCanvas.parent('#camera-div')
// myCanvas.parent('#camera-canvas')
// myVideo.hide()

    }
    
    
    p5.draw = function(){
p5.image(myVideo, 0, 0)
// graw the regions using the elements of the region array
p5.stroke('white')
p5.noFill()
// last layer
p5.rect(75, 75, 10, 10)
p5.rect(185, 75, 10, 10)
p5.rect(295, 75, 10, 10)
// mid layer
p5.rect(75, 185, 10, 10)
p5.rect(185, 185, 10, 10) // center piece
p5.rect(295, 185, 10, 10)
// first layer
p5.rect(75, 295, 10, 10)
p5.rect(185, 295, 10, 10)
p5.rect(295, 295, 10, 10)

// draw the bounding box for positioning the cube
p5.rect(25, 25, 340, 340)


matchColor = p5.color(255, 150, 0)
tolerance = 10

// send the current video image only if the temp face facets is empty
// console.log(tempFaceFacets)
if (tempFaceFacets[0].length < 1 && scannArray.length > 0){
let foundColor = findColor(p5, regionArray[6], colorsArray[0])
// console.log(foundColor)
}

    }





// ========================= COLOR TRACKER ==============================


// function for normalizing rgb values
function normalize(val){
    console.log('value')
    console.log(val)
// take  value/255 which will create a decimal.  Multiply by 100, which will give a decimal value x, where 0 < x < 100. This result is truncated, leaving a single or double digit integer.  The integer is then divided by 100, leaving a value of y, where 0 < y < 1.  This gives a value to 2 decimal places; which is the normalized version of the incoming red, green or blue value. 
let percentCalc = Math.trunc(Math.round((val/255)*100))/100

console.log('percentCalc')
console.log(percentCalc)


return percentCalc;
}

    function findColor(input, region, color){
// if(!input.canvas.childNodes[0]){
//     return undefined
// }



input.loadPixels()


for (let i=0; i < regionArray.length; i++){

    redValuesArr = []
greenValuesArr = []
blueValuesArr  = []

let xStart = regionArray[i].x0
let xEnd = regionArray[i].x1
let yStart = regionArray[i].y0
let yEnd = regionArray[i].y1

    for (let x = xStart; x <xEnd; x++){
        for (let y = yStart; y <yEnd ; y++){

            // INDEX OF RED - AND THEN GREEN, RED AND BLUE
            let rIndx = (y*400 + x)*4
            let  gIndx = rIndx + 1, bIndx = rIndx + 2, alphIndx =  rIndx + 3
            let r = input.pixels[rIndx]
            let g = input.pixels[gIndx]
            let b = input.pixels[bIndx]
            let alphaValue = input.pixels[alphIndx]
// console.log(`
// x: ${x}
// y: ${y}

// `)
// console.log(`
// red: ${r}
// green: ${g}
// blue: ${b}
// alpha: ${alphaValue}
// `)

redValuesArr.push(r)
greenValuesArr.push(g)
blueValuesArr.push(b)

if (y === 10){
    return
}
//             if(r >= p5.abs(rMatch - tolerance) &&
// g >= p5.abs(gMatch - tolerance) && b >= p5.abs(bMatch - tolerance)){
//         console.log('match found')
//         return p5.createVector(x, y)
//         }

        }

        }


        // map through the color arrays and take the average of all values in each array
let rAverage = Math.floor(redValuesArr.reduce((a, b) => a + b)/100)
let gAverage = Math.floor(greenValuesArr.reduce((a, b) => a + b)/100)
let bAverage = Math.floor(blueValuesArr.reduce((a, b) => a + b)/100)




/*
five main scenarios exist here: 
a) all three values of r,g,b are different; with a maximum, minimum and mid value
b) two of the rgb values are the same and are the maximum; the third value will be the minimum value.
c) two of the rgb values are the same and are the miminum; the third value will be the maximum value.
d) all colours are at or near maximum, which gives white
e) all colors are at or near mimimum, which gives black

The paired maxium values occur at 60, 180 and 300 degrees These are the positions of the primary (pigment) colours
rg max at 60 degrees = yellow
gb max at 180 degrees = cyan
br max at 300 degrees = magenta

The above shows that yellow is equal parts red and green, cyan is equal parts green and blue, and magenta is equal parts blue and red

The paired minimum values are at 0, 120, and 240 degrees. These are the positions of the primary (light) colors. Above the joined pair is the light primary, 
bg min at 0 degrees = red
rb min at 120 degress = green
rg min at 240 degrees = blue

The above shows the red, green and blue are the absence of the two colors with the same minimum value

cases b and c are easy to deal with :
the two matched colors give the pigment primary so a switch statement or shortcut can be used to assign the facet the pigment
*/

function pushColor(yPos, abbrv){
    // populate the temporary facet array, using the y-value to dictate which subarray to push the color into; each subarray represents a row
switch(yPos){
case 75: tempFaceFacets[0].push(colorAbbr)
break;
case 185: tempFaceFacets[1].push(colorAbbr)
break;
case 295: tempFaceFacets[2].push(colorAbbr)
break;
}
}

let degrees, degreeDelta, maxVal, minVal, mddlVal, rNorm, gNorm, bNorm, facetColor, hVal, sVal, vVal,  maxColor, mddlColor, minColor, minMaxRange, minMidRange, deltaFraction, colorAbbr;


// start with white color; all values will be very high!
if(rAverage > 190 && gAverage > 190 && bAverage > 190){
    facetColor = 'white'
     colorAbbr = 'w'
console.log(`
x: ${xStart}
y: ${yStart}
RGB: (${rAverage}, ${gAverage}, ${bAverage})
FACET: ${facetColor}
color abbreviation: ${colorAbbr}
`)

pushColor(yStart, colorAbbr)
}
else{
    facetColor = ''
// if paired maximums exist
if(rAverage === gAverage || gAverage === bAverage || rAverage === bAverage){
    if(rAverage === gAverage && (rAverage > bAverage)){facetColor = 'yellow'} // HUE 60 deg
    else if( gAverage === bAverage && (gAverage > rAverage)){facetColor = 'cyan'} // HUE 180 deg
    else if(rAverage === bAverage && (rAverage > gAverage)){facetColor = 'magenta'}  // HUE 300 deg
}else{
    // all there are not three numbers greater than 190, and no paired maximums exist so each value in the r, g, b parts of the color is unique

    // normalize the rgb values
rNorm = normalize(rAverage)
gNorm = normalize(gAverage)
bNorm = normalize(bAverage)

// console.log('rNorm')
// console.log(rNorm)
// console.log('gNorm')
// console.log(gNorm)
// console.log('bNorm')
// console.log(bNorm)


if(rNorm > gNorm && rNorm > bNorm){ //red is max value check the larger of the remaining two
    maxColor = 'red'
maxVal = rNorm;
if(gNorm > bNorm){ // green is larger than blue
mddlVal = gNorm;
minVal = bNorm;
mddlColor = 'green'
minColor = 'blue'
degrees = 0;
// when red = max and blue = min
}else{ // blue is larger than green
    mddlVal = bNorm;
    minVal = gNorm;
    mddlColor = 'blue'
    minColor = 'green'
    degrees = 300;
}


}else if(gNorm > rNorm && gNorm > bNorm){//green is max value get the larger of the remaining two 
    maxColor = 'green'
    maxVal = gNorm;
    if(rNorm > bNorm){ // green is larger than blue
        mddlVal = rNorm;
        minVal = bNorm;
        mddlColor = 'red'
        minColor = 'blue'
        degrees = 60;
        }else{ // blue is larger than green
            mddlVal = bNorm;
            minVal = rNorm;
            mddlColor = 'blue'
            minColor = 'red'
            degrees = 120;
        }


}else if(bNorm > rNorm && bNorm > gNorm){ //blue is max value get the larger of the remaining two
    maxColor = 'blue'
    maxVal = bNorm;
    if(rNorm > gNorm){ // green is larger than blue
        mddlVal = rNorm;
        minVal = gNorm;
        mddlColor = 'red'
        minColor = 'green'
        degrees = 240;
        }else{ // blue is larger than green
            mddlVal = gNorm;
            minVal = rNorm;
            mddlColor = 'green'
            minColor = 'red'
            degrees = 180;
        }
}

// console.log('degrees')
// console.log(degrees)

// now the starting degrees have been determined, calculate the delta from degree start, that is, the degree value representing the distance from the min value to the mid value - this is done by first finding the range (maxVal - minVal), then the distance from minVal to mddleVal (mddlVal - midVal). Then, dividing the latter by the former gives what percentage of the range is taken up by the distance from min to mid values.  Multiply 60 by that value, and this is how far, in degrees, the mid value is from the min.  Add that value to the beginning of the sector degree value and you have the precise hue value
minMaxRange = maxVal - minVal
minMidRange = mddlVal - minVal
deltaFraction = minMidRange/minMaxRange
// console.log('delta fraction')
// console.log(deltaFraction)
// console.log('degrees')
// console.log(degrees)

degreeDelta = deltaFraction*60
// now sum the start degree with the delta degree for the hue value
// console.log('degreeDelta')
// console.log(degreeDelta)
hVal = Math.round(degrees + degreeDelta)
// the max val has already been determined  use it to find the saturation
sVal = Math.trunc(((maxVal - minVal)/maxVal)*100)
// the vVal is the maximum value
vVal = maxVal*100

// define the color based on a switch statement for all regions

// console.log('maxColor')
// console.log(maxColor)
// console.log('minColor')
// console.log(minColor)
// console.log('mddlColor')
// console.log(mddlColor)
// console.log('degreeDelta')
// console.log(degreeDelta)
// console.log('maxVal')
// console.log(maxVal)
// console.log('mddlVal')
// console.log(mddlVal)
// console.log('minVal')
// console.log(minVal)

// use the hue percentage value to determine the region of the examined color
if(hVal < 15){facetColor = 'red'; colorAbbr = 'r'}
else if(hVal < 32){facetColor = 'orange'; colorAbbr = 'o'}
else if(hVal < 60){facetColor = 'yellow'; colorAbbr = 'y'}
else if(hVal < 155){facetColor = 'green'; colorAbbr = 'g'}
else if(hVal < 225){facetColor = 'blue'; colorAbbr = 'b'}
else if(hVal < 360){facetColor = 'red'; colorAbbr = 'r'}


console.log(`
x: ${xStart}
y: ${yStart}
RGB: (${rAverage}, ${gAverage}, ${bAverage})
HSV: (${hVal} deg, ${sVal}%, ${vVal}%)
FACET: ${facetColor}
colour abbreviation: ${colorAbbr}
`)

pushColor(yStart, colorAbbr)
}
}

}

cameraColours(tempFaceFacets)
// console.log(tempFaceFacets)
// maybe, create a function in script layout 2 and import it here, and perhaps send a tempFaceFacets array as a variable to the function so that it gets executed on the other script; or find out how that works. 
    }

    
    });



    export {faceYellow, faceGreen, faceOrange, faceBlue, faceRed, faceWhite, resetFacets}