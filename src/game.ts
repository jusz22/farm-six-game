import { SPRITE_64, Hex, TileVariant } from "./sprites.js";
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
      {
        point: new Vector(1, 1),
        variant: TileVariant.Dry,
      },
      {
        point: new Vector(1, 2),
        variant: TileVariant.Dry,
      },
      {
        point: new Vector(2, 1),
        variant: TileVariant.Dry,
      },
      {
        point: new Vector(2, 2),
        variant: TileVariant.Dry,
      },
      {
        point: new Vector(1, 3),
        variant: TileVariant.Dry,
      },
      {
        point: new Vector(2, 4),
        variant: TileVariant.Dry,
      },
      {
        point: new Vector(6, 6),
        variant: TileVariant.Dry,
      },
    ];
  }

  hexToPixel(hex: Hex) {
    const sprite = this.getSprite(hex)!;
    const x = sprite.size.x * (hex.point.x + 0.5 * (hex.point.y & 1));
    const y = (sprite.size.y * 3 * hex.point.y) / 4;
    return new Vector(x, y);
  }
  getSprite(hex: Hex) {
    return SPRITE_64.tiles[hex.variant];
  }

  drawHexes(hexes: Hex[]) {
    for (const hex of hexes) {
      const sprite = this.getSprite(hex);
      if (!sprite) return;
      const screenCoords = this.hexToPixel(hex).round().add(this.screenOffset);
      this.ctx.drawImage(
        this.sprites,
        sprite.start.x,
        sprite.start.y,
        sprite.sourceSize.x,
        sprite.sourceSize.y,
        screenCoords.x,
        screenCoords.y,
        sprite.sourceSize.x,
        sprite.sourceSize.y
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
