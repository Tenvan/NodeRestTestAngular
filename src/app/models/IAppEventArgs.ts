export interface IAppEventArgs {
  event: string;

  payload: {
    name: string;
    value: {
      data: {
        event: string;
        payload: number;
      };
    };
  };
}

export interface IWorldTickerEventArgs {
  event: string;

  payload: number;
}
