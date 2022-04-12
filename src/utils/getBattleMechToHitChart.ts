export function getBattleMechToHitChart(): IToHitTable {

    let toHitTable: IToHitTable = {
        rows: [],
      };

      toHitTable.rows.push({
        roll: 2,
        isCrit: true,
        left: {
          location: "lt",
          hasRear: true,
          isCrit: true,
        },
        front: {
          location: "ct",
          hasRear: true,

        },
        right: {
          location: "rt",
          hasRear: true,
          isCrit: true,
        },
      });

      toHitTable.rows.push({
        roll: 3,
        left: {
          location: "ll",
        },
        front: {
          location: "ra",
        },
        right: {
          location: "rl",
        },
      });

      toHitTable.rows.push({
        roll: 4,
        left: {
          location: "la",
        },
        front: {
          location: "ra",
        },
        right: {
          location: "ra",
        },
      });

      toHitTable.rows.push({
        roll: 5,
        left: {
          location: "la",
        },
        front: {
          location: "rl",
        },
        right: {
          location: "ra",
        },
      });

      toHitTable.rows.push({
        roll: 6,
        left: {
          location: "ll",
        },
        front: {
          location: "rt",
          hasRear: true,
        },
        right: {
          location: "rl",
        },
      });

      toHitTable.rows.push({
        roll: 7,
        left: {
          location: "lt",
          hasRear: true,
        },
        front: {
          location: "ct",
          hasRear: true,
        },
        right: {
          location: "rt",
          hasRear: true,
        },
      });

      toHitTable.rows.push({
        roll: 8,
        left: {
          location: "ct",
          hasRear: true,
        },
        front: {
          location: "lt",
          hasRear: true,
        },
        right: {
          location: "ct",
          hasRear: true,
        },
      });

      toHitTable.rows.push({
        roll: 9,
        left: {
          location: "rt",
          hasRear: true,
        },
        front: {
          location: "ll",
        },
        right: {
          location: "lt",
          hasRear: true,
        },
      });

      toHitTable.rows.push({
        roll: 10,
        left: {
          location: "ra",
        },
        front: {
          location: "la",
        },
        right: {
          location: "la",
        },
      });

      toHitTable.rows.push({
        roll: 11,
        left: {
          location: "rl",
        },
        front: {
          location: "la",
        },
        right: {
          location: "ll",
        },
      });

      toHitTable.rows.push({
        roll: 12,
        left: {
          location: "hd",
        },
        front: {
          location: "hd",
        },
        right: {
          location: "hd",
        },
      });

    return toHitTable;

}

interface IToHitTable {
    rows: IToHitTableRow[];
  }
  interface IToHitTableRow {
    roll: number;
    isCrit?: boolean;
    left: IToHitTableLocation;
    front: IToHitTableLocation;
    right: IToHitTableLocation;
  }
  interface IToHitTableLocation {

    location: string;
    hasRear?: boolean;
    isCrit?: boolean;
  }