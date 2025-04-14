import { SPRITE_64, Hex } from "./sprites.js";
import { Vector } from "./vector.js";

const canvas = document.getElementById("game") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

class Game {
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  sprites: HTMLImageElement;
  isMouseDown: boolean;
  lastPos: null | Vector;
  screenOffset: Vector;
  hexes: Hex[];

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.canvas = ctx.canvas;
    this.isMouseDown = false;
    this.lastPos = null;
    this.screenOffset = new Vector(0, 0);

    window.addEventListener("resize", () => {
      this.resize();
    });

    canvas.addEventListener("mousedown", (e: MouseEvent) => {
      this.isMouseDown = true;
      this.lastPos = new Vector(e.x, e.y);
    });

    canvas.addEventListener("mouseup", () => {
      this.isMouseDown = false;
      this.lastPos = null;
    });

    canvas.addEventListener("mousemove", (e: MouseEvent) => {
      if (!this.isMouseDown) return;
      if (this.lastPos === null) return;

      const mouseMoveVector = new Vector(e.x, e.y);
      this.screenOffset = this.screenOffset.add(
        mouseMoveVector.sub(this.lastPos)
      );
      this.lastPos = mouseMoveVector;
    });

    this.resize();
    this.sprites = new Image();
    this.sprites.src = "./sprites/sprites.png";

    this.hexes = [
      { x: 1, y: 1, sprite: SPRITE_64.tiles[1] },
      { x: 1, y: 2, sprite: SPRITE_64.tiles[1] },
      { x: 2, y: 1, sprite: SPRITE_64.tiles[1] },
      { x: 2, y: 2, sprite: SPRITE_64.tiles[1] },
      { x: 1, y: 3, sprite: SPRITE_64.tiles[1] },
      { x: 2, y: 4, sprite: SPRITE_64.tiles[1] },
      { x: 6, y: 6, sprite: SPRITE_64.tiles[1] },
    ];
  }

  hexToPixel(hex: Hex) {
    const x = hex.sprite.size.x * (hex.x + 0.5 * (hex.y & 1));
    const y = (hex.sprite.size.y * 3 * hex.y) / 4;
    return new Vector(x, y);
  }

  drawHexes(hexes: Hex[]) {
    for (const hex of hexes) {
      const screenCoords = this.hexToPixel(hex).round().add(this.screenOffset);
      this.ctx.drawImage(
        this.sprites,
        hex.sprite.start.x,
        hex.sprite.start.y,
        hex.sprite.sourceSize.x,
        hex.sprite.sourceSize.y,
        screenCoords.x,
        screenCoords.y,
        hex.sprite.sourceSize.x,
        hex.sprite.sourceSize.y
      );
    }
  }

  draw() {
    const { ctx, canvas } = this;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.drawHexes(this.hexes);

    requestAnimationFrame(() => {
      this.draw();
    });
  }

  resize() {
    const pixelRatio = window.devicePixelRatio;
    const boundingBox = canvas.parentElement!.getBoundingClientRect();
    this.canvas.width = boundingBox.width * pixelRatio;
    this.canvas.height = boundingBox.height * pixelRatio;

    this.canvas.style.width = `${boundingBox.width}px`;
    this.canvas.style.height = `${boundingBox.height}px`;
  }

  start() {
    this.draw();
  }
}

const game = new Game(ctx);

game.start();
