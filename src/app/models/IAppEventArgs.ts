export interface IAppEventArgs {
  event: string;

  payload: {
    value: number;
    name: string;
  };
}

export interface IWorldTickerEventArgs {
  event: string;

  payload: number;
}
