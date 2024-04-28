

let img;
let imgAfter;

new p5(function(p5){

p5.preload = function(){
img = p5.loadImage('./nature.jpeg')
}

    p5.setup = function(){

        // console.log(p5.filter(GRAY))
        img.resize(300,0)
        
      let myCanvas =  p5.createCanvas(img.width, img.height)
      myCanvas.parent("#camera-canvas")
      p5.noLoop()
   
    }
    
    
    p5.draw = function(){
      p5.image(img, 0, 0)
        p5.loadPixels()
        for(let x = 0; x < img.width; x+=20){
            for(let y = 0; y < img.height; y+=20 ){
                 // formula for getting the index value of the red color of the specific index from the one-dimentional array containing r, g, b, a values for each index in an image or canvas
                let rIndx = (y*img.width + x)*4
//indexes for b,g and a, of same pixel, which are at index positions r-index + n, for n = {1, 2, 3}
              let  gIndx = rIndx + 1, bIndx = rIndx + 2, aIndx = rIndx + 3
                let r = p5.pixels[rIndx]
                let g = p5.pixels[gIndx]
                let b = p5.pixels[bIndx]
                let a = p5.pixels[aIndx]
// check the index values
console.log(r, g, b, a)

// the values can be changed by altering the value of the element
                p5.pixels[rIndx] = 255
                p5.pixels[gIndx] = 255
                p5.pixels[bIndx] = 255
                p5.pixels[aIndx] = 255
            }

        }
        p5.updatePixels()
    }
    
    });
    