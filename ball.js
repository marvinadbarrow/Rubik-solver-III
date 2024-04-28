export default class Ball{
    constructor(x, y, r){

    this.x = x;
    this.y = y;
    this.r = r;
    this.d = 2*r;
    this.xVelocity = -4
    this.yVelocity = 3;
    }

    show(p5){
        p5.color(255)
        p5.ellipse(this.x, this.y, this.d, this.d)
    }

    move(p5){
    this.x += this.xVelocity
    this.y += this.yVelocity
    this.bounce(p5)
    }

    bounce(p5){
        if (this.x - this.r <=0  || this.x + this.r >= p5.width){
            this.xVelocity *= -1
        }

        if (this.y - this.r <=0  || this.y + this.r >= p5.height){
            this.yVelocity *= -1
        }
    }
}