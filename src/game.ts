import { SPRITE_64, Hex, TileVariant, SPRITE_96 } from "./sprites.js";
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
  scale: number;

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
      this.screenOffset = this.screenOffset.vAdd(
        mouseMoveVector.vSub(this.lastPos)
      );
      this.lastPos = mouseMoveVector;
    });

    canvas.addEventListener("wheel", (e: WheelEvent) => {
      this.zoom(e);
    });

    this.scale = 1;
    this.resize();
    this.sprites = new Image();
    this.sprites.src = "./sprites/sprites.png";

    this.hexes = [
      {
        point: new Vector(0, 0),
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
  zoom(e: WheelEvent) {
    e.preventDefault();
    this.scale += e.deltaY * -0.01;
    this.scale = Math.min(Math.max(1, this.scale), 4);
  }

  hexToPixel(hex: Hex) {
    const sprite = this.getSprite(hex)!;
    const x = sprite.size.x * (hex.point.x + 0.5 * (hex.point.y & 1));
    const y = (sprite.size.y * 3 * hex.point.y) / 4;
    return new Vector(x, y);
  }

  getSprite(hex: Hex) {
    if (this.scale & 1) {
      return SPRITE_64.tiles[hex.variant];
    }
    return SPRITE_96.tiles[hex.variant];
  }

  drawHexes(hexes: Hex[]) {
    for (const hex of hexes) {
      const sprite = this.getSprite(hex);
      if (!sprite) return;
      const drawingScale = Math.floor((this.scale - 1) / 2) + 1;
      const screenCoords = this.hexToPixel(hex)
        .round()
        .vAdd(this.screenOffset.div(drawingScale));

      const startCoords = screenCoords
        .mul(drawingScale)
        .vSub(sprite.size.mul(drawingScale));

      const dSize = sprite.sourceSize.mul(drawingScale);
      this.ctx.imageSmoothingEnabled = false;
      this.ctx.drawImage(
        this.sprites,
        sprite.start.x,
        sprite.start.y,
        sprite.sourceSize.x,
        sprite.sourceSize.y,
        startCoords.x,
        startCoords.y,
        dSize.x,
        dSize.y
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
