export interface IAppTickerEventArgs {
  event: string;

  id: string;

  payload: {
    message: string;
    data: any;
  };
}
