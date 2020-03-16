import { IAction, IHandlerDictionary } from './interfaces';

export const VIDEOS_LIST = 'VIDEOS_LIST';
export const VIDEOS_ADD = 'VIDEOS_ADD';

interface IVideo {
  id: string;
  title: string;
  filename: string;
  filenameOrg?: string;
  description?: string;
  creationDate?: Date;
}

export declare type IVideoState = IVideo[];
const initialState: IVideoState = [];

const actionHandlers: IHandlerDictionary<IVideoState> = {
  [VIDEOS_LIST]: (state: IVideoState, action: IAction) =>
    (action.payload as IVideoState),
  [VIDEOS_ADD]: (state: IVideoState, action: IAction) => ([
    ...state,
    action.payload
  ] as IVideoState),
};

const reducer = (state = initialState, action: IAction) => {
  const handler = actionHandlers[action.type];
  return handler ? handler(state, action) : state;
}

export const videosList = (payload: Object[]) =>
  ({ type: VIDEOS_LIST, payload });

export const videosAdd = (payload: Object) =>
  ({ type: VIDEOS_ADD, payload });

export const actions = {
  videosList,
  videosAdd,
};

export declare type IActions = typeof actions;

export default reducer;
