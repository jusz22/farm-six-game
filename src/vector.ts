export class Vector {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  equals(other: Vector) {
    return this.x == other.x && this.y == other.y;
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

  vAdd(v: Vector) {
    return new Vector(this.x + v.x, this.y + v.y);
  }

  vSub(v: Vector) {
    return new Vector(this.x - v.x, this.y - v.y);
  }

  sub(n: number) {
    return new Vector(this.x - n, this.y - n);
  }

  mul(m: number) {
    return new Vector(this.x * m, this.y * m);
  }

  div(d: number) {
    return new Vector(this.x / d, this.y / d);
  }
}
