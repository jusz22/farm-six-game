import { Vector } from "./vector.js";

type Sprite = {
  start: Vector;
  size: Vector;
  sourceSize: Vector;
  offset: Vector;
};

type Sprites = {
  tiles: Sprite[];
};

export type Hex = {
  x: number;
  y: number;
  sprite: Sprite;
};

export const SPRITE_64: Sprites = {
  tiles: [
    {
      start: new Vector(0, 0),
      size: new Vector(64, 36),
      sourceSize: new Vector(64, 42),
      offset: new Vector(-32, -18),
    },
    {
      start: new Vector(0, 42),
      size: new Vector(64, 36),
      sourceSize: new Vector(64, 42),
      offset: new Vector(-32, -18),
    },
  ],
};

export const SPRITE_96: Sprites = {
  tiles: [
    {
      start: new Vector(64, 0),
      size: new Vector(96, 56),
      sourceSize: new Vector(96, 64),
      offset: new Vector(-48, -28),
    },
    {
      start: new Vector(64, 64),
      size: new Vector(96, 56),
      sourceSize: new Vector(96, 64),
      offset: new Vector(-48, -28),
    },
  ],
};
