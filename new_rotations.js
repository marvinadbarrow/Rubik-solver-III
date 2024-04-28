
let rowArr = [0, 1, 2]
let indexSwap = [2, 1, 0]
aboutYFaces = [1, 2, 3, 5]
aboutXFaces = [0, 2, 4, 5]
// U or U' move
function upRotate(button, double){
let preRotateCube = clone(cubeMatrixAlt)
switch(button){
  case 'u-btn': //general rule for face facets - CW rotations
aboutYFaces.forEach((x, i) =>{preRotateCube[x][0] = cubeMatrixAlt[aboutYFaces[(i+1)%4]][0]})
indexSwap.forEach(y =>{rowArr.forEach((x)=>{preRotateCube[0][y][x] = cubeMatrixAlt[0][2-x][y]})})
  break;
case 'u2-btn': // rules for side-face top row shifting and translating face facets on rotated face
aboutYFaces.forEach((x, i) =>{preRotateCube[x][0] = cubeMatrixAlt[aboutYFaces[(i+2)%4]][0]})
indexSwap.forEach(y =>{rowArr.forEach(x =>{preRotateCube[0][x][y] = cubeMatrixAlt[0][2-x][2-y]})})
break;
case 'u-prime-btn': // general rule for face facets - PRIME rotations
aboutYFaces.forEach((x, i) =>{preRotateCube[x][0] = cubeMatrixAlt[aboutYFaces[(i+3)%4]][0]})
indexSwap.forEach(y =>{ rowArr.forEach((x) =>{preRotateCube[0][x][y] = cubeMatrixAlt[0][y][2-x]})})
break;
}

let nextCubeMatrixAlt = clone(preRotateCube)
renderCube(nextCubeMatrixAlt, 'update', cubeMatrixAlt, button)
}


// D or D' move
function downRotate(button, double){
  let preRotateCube = clone(cubeMatrixAlt)
  switch(button){
      case 'd-btn': // general rule for face facets - cw rotations
aboutYFaces.forEach((x, i) =>{preRotateCube[x][2] = cubeMatrixAlt[aboutYFaces[(i+3)%4]][2]})
indexSwap.forEach(y =>{ rowArr.forEach((x)=>{preRotateCube[4][y][x] = cubeMatrixAlt[4][2-x][y]})})
      break;
      case 'd2-btn':
  aboutYFaces.forEach((x, i) =>{preRotateCube[x][2] = cubeMatrixAlt[aboutYFaces[(i+2)%4]][2]})
  indexSwap.forEach(y =>{rowArr.forEach(x =>{preRotateCube[4][x][y] = cubeMatrixAlt[4][2-x][2-y]})})
        break;
    case 'd-prime-btn': // general rule for face facets - PRIME rotations
aboutYFaces.forEach((x, i) =>{preRotateCube[x][2] = cubeMatrixAlt[aboutYFaces[(i+1)%4]][2]})
indexSwap.forEach(y =>{ rowArr.forEach((x)=>{preRotateCube[4][x][y] = cubeMatrixAlt[4][y][2-x]})}) 
    break;
  }
  let nextCubeMatrixAlt = clone(preRotateCube)
renderCube(nextCubeMatrixAlt, 'update', cubeMatrixAlt, button)
}


// L or L' move
function leftRotate(button, double){
  let preRotateCube = clone(cubeMatrixAlt)
  switch(button){
  case 'l-btn':rowArr.forEach((x) =>{lCW.forEach(sub =>{
preRotateCube[sub[0]][x][sub[1]] = cubeMatrixAlt[sub[2]][Math.abs(sub[4] - x)][sub[3]]})//B3
indexSwap.forEach((y) =>{preRotateCube[1][y][x] = cubeMatrixAlt[1][2-x][y]})
})
break;
case 'l2-btn':
indexSwap.forEach(y =>{rowArr.forEach(x =>{preRotateCube[1][x][y] = cubeMatrixAlt[1][2-x][2-y]})})
aboutXFaces.forEach((f, i) => { rowArr.forEach(x =>{
f%4 === 0? preRotateCube[f][x][0] = cubeMatrixAlt[aboutXFaces[(i+2)%4]][x][0]:f%4 === 2?
preRotateCube[f][x][0] = cubeMatrixAlt[aboutXFaces[(i+2)%4]][2-x][2]: preRotateCube[f][x][2] = cubeMatrixAlt[aboutXFaces[(i+2)%4]][2-x][0]
})})
break;
 case 'l-prime-btn':
 rowArr.forEach((x) =>{lCCW.forEach(sub =>{
preRotateCube[sub[0]][x][sub[1]] = cubeMatrixAlt[sub[2]][Math.abs(sub[4]-x)][sub[3]]})//B3
indexSwap.forEach(y =>{preRotateCube[1][x][y] = cubeMatrixAlt[1][y][2-x]})
})
break;
}
let nextCubeMatrixAlt = clone(preRotateCube)
renderCube(nextCubeMatrixAlt, 'update', cubeMatrixAlt, button)
}



// R or R' move
function rightRotate(button, double){
  let preRotateCube = clone(cubeMatrixAlt)
  switch(button){
      case 'r-btn':
rowArr.forEach((x) =>{rCW.forEach(sub =>{
preRotateCube[sub[0]][x][sub[1]] = cubeMatrixAlt[sub[2]][Math.abs(sub[4] - x)][sub[3]]})//B3
indexSwap.forEach((y) =>{preRotateCube[3][y][x] = cubeMatrixAlt[3][2-x][y] })
    })
        break;
        case 'r2-btn':
        // faceRotationMain(3, '2X')
indexSwap.forEach(y =>{rowArr.forEach(x =>{preRotateCube[3][x][y] = cubeMatrixAlt[3][2-x][2-y]})})
aboutXFaces.forEach((f, i) => { rowArr.forEach(x =>{
f%4 === 0? preRotateCube[f][x][2] = cubeMatrixAlt[aboutXFaces[(i+2)%4]][x][2]:f%4 === 2?
preRotateCube[f][x][2] = cubeMatrixAlt[aboutXFaces[(i+2)%4]][2-x][0]:preRotateCube[f][x][0] = cubeMatrixAlt[aboutXFaces[(i+2)%4]][2-x][2]})})
          break;
   case 'r-prime-btn':
   rowArr.forEach((x) =>{rCCW.forEach(sub =>{
preRotateCube[sub[0]][x][sub[1]] = cubeMatrixAlt[sub[2]][Math.abs(sub[4]-x)][sub[3]]})//B3
// faceRotationMain(3, 'CCW')
indexSwap.forEach(y =>{preRotateCube[3][x][y] = cubeMatrixAlt[3][y][2-x]})
})
break;
}
console.log(preRotateCube)
let nextCubeMatrixAlt = clone(preRotateCube)
renderCube(nextCubeMatrixAlt, 'update', cubeMatrixAlt, button)
}


// F or F' move
function frontRotate(button, double){
  let preRotateCube = clone(cubeMatrixAlt)
  switch(button){
    case 'f-btn':
    rowArr.forEach((x) =>{
fCWa.forEach(sub =>{preRotateCube[sub[0]][sub[1]][x] = cubeMatrixAlt[sub[2]][2-x][sub[3]]})//A
fCWb.forEach(sub =>{preRotateCube[sub[0]][x][sub[1]] = cubeMatrixAlt[sub[2]][sub[3]][x]}) //B1
indexSwap.forEach((y) =>{preRotateCube[2][y][x] = cubeMatrixAlt[2][2-x][y]}) // face
    })
      break;
  case 'f2-btn':
  console.log('front double clicked')
  // faceRotationMain(2, '2X')
  indexSwap.forEach(y =>{rowArr.forEach(x =>{preRotateCube[2][x][y] = cubeMatrixAlt[2][2-x][2-y]})})
  // NOTE: the formulae for front and back rotations are the same, just row/col numbers change - maybe the four numbers for each case can be sent as a subarray in an array parameter and for each subarray the numbers can be inserted; or the array can be created outside like with the rest of the examples so there would only be one array for F2 moves and one for B2 moves.  seems simpler.  Maybe that technique should be used for left and right double rotates because with the addition of an array the function may be more readable. 
  rowArr.forEach(x =>{
preRotateCube[0][2][x] = cubeMatrixAlt[4][0][2-x]
preRotateCube[4][0][x] = cubeMatrixAlt[0][2][2-x] 
preRotateCube[1][x][2] = cubeMatrixAlt[3][2-x][0]
preRotateCube[3][x][0] = cubeMatrixAlt[1][2-x][2]
  })
  
    break;
 case 'f-prime-btn':
rowArr.forEach((x) =>{
fCCWa.forEach(sub =>{preRotateCube[sub[0]][x][sub[1]] = cubeMatrixAlt[sub[2]][sub[3]][2-x]})//B2
fCCWb.forEach(sub =>{preRotateCube[sub[0]][sub[1]][x] = cubeMatrixAlt[sub[2]][x][sub[3]]}) //A
indexSwap.forEach(y =>{preRotateCube[2][x][y] = cubeMatrixAlt[2][y][2-x]})// face
    })
break;
}
console.log(preRotateCube)
let nextCubeMatrixAlt = clone(preRotateCube)
renderCube(nextCubeMatrixAlt, 'update', cubeMatrixAlt, button)
}// clockwise methods 1 and 2

// B or B' move
function backRotate(button, double){
  let preRotateCube = clone(cubeMatrixAlt)
  switch(button){
    case 'b-btn':
    rowArr.forEach(x =>{
bCWa.forEach(sub =>{preRotateCube[sub[0]][sub[1]][x] = cubeMatrixAlt[sub[2]][x][sub[3]]}) //A
bCWb.forEach(sub =>{preRotateCube[sub[0]][x][sub[1]] = cubeMatrixAlt[sub[2]][sub[3]][2-x]})//B2
// faceRotationMain(5, 'CW')
indexSwap.forEach(y =>{preRotateCube[5][y][x] = cubeMatrixAlt[5][2-x][y]})
    })
      break;
      case 'b2-btn':
        console.log('back double clicked')
      // faceRotationMain(5, '2X')
  indexSwap.forEach(y =>{rowArr.forEach(x =>{preRotateCube[5][x][y] = cubeMatrixAlt[5][2-x][2-y]})})
  rowArr.forEach(x =>{
preRotateCube[0][0][x] = cubeMatrixAlt[4][2][2-x]
preRotateCube[4][2][x] = cubeMatrixAlt[0][0][2-x] 
preRotateCube[1][x][0] = cubeMatrixAlt[3][2-x][2]
preRotateCube[3][x][2] = cubeMatrixAlt[1][2-x][0]
  })
  
      break;
 case 'b-prime-btn':
      rowArr.forEach(x =>{
bCCWa.forEach(sub =>{preRotateCube[sub[0]][x][sub[1]] = cubeMatrixAlt[sub[2]][sub[3]][x]})//B1
bCCWb.forEach(sub =>{preRotateCube[sub[0]][sub[1]][x] = cubeMatrixAlt[sub[2]][2-x][sub[3]]}) //A
// faceRotationMain(5, 'CCW')
indexSwap.forEach(y =>{preRotateCube[5][x][y] = cubeMatrixAlt[5][y][2-x]})
      })
break;
}
console.log(preRotateCube)
let nextCubeMatrixAlt = clone(preRotateCube)
renderCube(nextCubeMatrixAlt, 'update', cubeMatrixAlt, button)
}

