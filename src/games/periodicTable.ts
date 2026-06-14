import { getElementByAtomicNumber } from './sequences/elements';

export interface PeriodicTableCell {
  atomicNumber: number;
  symbol: string;
  name: string;
  row: number;
  col: number;
}

function buildGridPositions(): Record<number, { row: number; col: number }> {
  const pos: Record<number, { row: number; col: number }> = {};
  let n = 1;

  pos[n++] = { row: 1, col: 1 };
  pos[n++] = { row: 1, col: 18 };

  for (let col = 1; col <= 2; col++) {
    pos[n++] = { row: 2, col };
  }
  for (let col = 13; col <= 18; col++) {
    pos[n++] = { row: 2, col };
  }

  for (let col = 1; col <= 2; col++) {
    pos[n++] = { row: 3, col };
  }
  for (let col = 13; col <= 18; col++) {
    pos[n++] = { row: 3, col };
  }

  for (let row = 4; row <= 5; row++) {
    for (let col = 1; col <= 18; col++) {
      pos[n++] = { row, col };
    }
  }

  pos[n++] = { row: 6, col: 1 };
  pos[n++] = { row: 6, col: 2 };
  pos[n++] = { row: 6, col: 3 };
  for (let col = 4; col <= 17; col++) {
    pos[n++] = { row: 9, col };
  }
  for (let col = 4; col <= 18; col++) {
    pos[n++] = { row: 6, col };
  }

  pos[n++] = { row: 7, col: 1 };
  pos[n++] = { row: 7, col: 2 };
  pos[n++] = { row: 7, col: 3 };
  for (let col = 4; col <= 17; col++) {
    pos[n++] = { row: 10, col };
  }
  for (let col = 4; col <= 18; col++) {
    pos[n++] = { row: 7, col };
  }

  return pos;
}

const GRID_POSITIONS = buildGridPositions();

export const PERIODIC_TABLE_CELLS: PeriodicTableCell[] = Object.entries(
  GRID_POSITIONS,
).map(([atomicNumber, { row, col }]) => {
  const n = Number(atomicNumber);
  const element = getElementByAtomicNumber(n)!;
  return {
    atomicNumber: n,
    symbol: element.symbol,
    name: element.name,
    row,
    col,
  };
});

export function getPeriodicTableCell(
  atomicNumber: number,
): PeriodicTableCell | null {
  return (
    PERIODIC_TABLE_CELLS.find((cell) => cell.atomicNumber === atomicNumber) ??
    null
  );
}
