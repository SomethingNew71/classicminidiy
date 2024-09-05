export interface TorqueSpecs {
  engineTable: Table;
  suspensionTable: Table;
  electricalTable: ElectricalTable;
  gearboxTable: Table;
}

export interface ElectricalTable {
  title: string;
  icon: string;
  search: string;
  items: ElectricalTableItem[];
}

export interface ElectricalTableItem {
  name: string;
  lbin: number | string;
  nm: number | string;
  notes: string;
}

export interface Table {
  title: string;
  icon: string;
  search: string;
  items: EngineTableItem[];
}

export interface EngineTableItem {
  name: string;
  lbft: string;
  nm: string;
  notes?: string;
}
