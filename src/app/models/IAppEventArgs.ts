export interface IAppEventArgs {
  // #region Properties (3)

  event: string;
  id: string;
  payload: {
    name: string;
    value: {
      data: {
        id: string;
        event: string;
        data: any;
      };
    };
  };

  // #endregion Properties (3)
}
