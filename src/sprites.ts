import { Vector } from "./vector.js";

export enum TileVariant {
  Dry = "dry",
  Cultivated = "cultivated",
  Watered = "watered",
}

type Sprite = {
  start: Vector;
  size: Vector;
  sourceSize: Vector;
  offset: Vector;
};

type Tiles = {
  [key in TileVariant]?: Sprite;
};

type Sprites = {
  tiles: Tiles;
};

export type Hex = {
  point: Vector;
  variant: TileVariant;
};

export const SPRITE_64: Sprites = {
  tiles: {
    [TileVariant.Watered]: {
      start: new Vector(0, 0),
      size: new Vector(64, 36),
      sourceSize: new Vector(64, 42),
      offset: new Vector(-32, -18),
    },
    [TileVariant.Dry]: {
      start: new Vector(0, 42),
      size: new Vector(64, 36),
      sourceSize: new Vector(64, 42),
      offset: new Vector(-32, -18),
    },
  },
};

export const SPRITE_96: Sprites = {
  tiles: {
    [TileVariant.Watered]: {
      start: new Vector(64, 0),
      size: new Vector(96, 56),
      sourceSize: new Vector(96, 64),
      offset: new Vector(-48, -28),
    },
    [TileVariant.Dry]: {
      start: new Vector(64, 64),
      size: new Vector(96, 56),
      sourceSize: new Vector(96, 64),
      offset: new Vector(-48, -28),
    },
  },
};
