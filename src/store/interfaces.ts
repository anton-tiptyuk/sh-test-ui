export interface IAction {
  type: string;
  payload?: Object;
}

export declare type IHandlerDictionary<TState> = { [s: string]: (s: TState, a: IAction) => TState };
