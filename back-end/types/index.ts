export type PositionInput = {
    id: number;
    x: number;
    y: number;
    type: string;
    active: boolean;
}

export type PositionUpdate = {
  posID: number;
  floorID: number;
  playerID: number;
  x: number;
  y: number;
  active: boolean;
}