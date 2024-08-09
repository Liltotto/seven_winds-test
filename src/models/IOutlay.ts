export interface IOutlay {
  child: IOutlay[];
  equipmentCosts: number;
  estimatedProfit: number;
  id: number;
  machineOperatorSalary: number;
  mainCosts: number;
  materials: number;
  mimExploitation: number;
  overheads: number;
  rowName: string;
  salary: number;
  supportCosts: number;
  total: number;
}

export interface IOutlayReturnItem extends Omit<IOutlay, "child"> {}

export interface IOutlayReturn {
  current: IOutlayReturnItem;
  changed: IOutlayReturnItem[];
}

export interface IOutlayCreate {
  equipmentCosts: number;
  estimatedProfit: number;
  machineOperatorSalary: number;
  mainCosts: number;
  materials: number;
  mimExploitation: number;
  overheads: number;
  parentId: number | null;
  rowName: string;
  salary: number;
  supportCosts: number;
}

export interface IOutlayRow extends IOutlay, IOutlayCreate {}

export interface ICreateOutlayRowArgs {
  eID: number;
  body: IOutlayCreate;
}

export interface IUpdateOutlayRowArgs extends ICreateOutlayRowArgs {
  rID: number;
}

export interface IDeleteOutlayRowArgs
  extends Pick<IUpdateOutlayRowArgs, "eID" | "rID"> {}
