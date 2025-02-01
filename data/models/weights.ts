export interface Item {
  item: string;
  weight: number | null;
}

export interface Table {
  title: string;
  search: string;
  items: Item[];
}

export interface Weights {
  Brakes: Table;
  Body: Table;
  Electrics: Table;
  EngineBay: Table;
  Engine: Table;
}
