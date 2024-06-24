export interface IOutplay {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    child: { [key: string]: any }[];
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
  
  export interface ICreateOutlayRowArgs {
    eID: number;
    body: IOutplay;
  }

  export interface IUpdateOutlayRowArgs extends ICreateOutlayRowArgs {
    rID: number
  }

  export interface IDeleteOutlayRowArgs extends Pick<IUpdateOutlayRowArgs, 'eID' | 'rID'> {}