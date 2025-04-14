export class Vector {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  round() {
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
    return this;
  }

  floor() {
    this.x = Math.floor(this.x);
    this.y = Math.floor(this.y);
    return this;
  }

  add(v: Vector) {
    return new Vector(this.x + v.x, this.y + v.y);
  }

  sub(v: Vector) {
    return new Vector(this.x - v.x, this.y - v.y);
  }
}
