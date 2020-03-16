import { IAction, IHandlerDictionary } from './interfaces';

export const VIDEOS_LIST = 'VIDEOS_LIST';

interface IVideo {
  id: string;
  title: string;
  filename: string;
  filenameOrg?: string;
  description?: string;
  creationDate?: Date;
}

declare type IVideoState = IVideo[];
const initialState: IVideoState = [];


const actionHandlers: IHandlerDictionary<IVideoState> = {
  [VIDEOS_LIST]: (state: IVideoState, action: IAction) =>
    (action.payload as IVideoState),
};

const reducer = (state = initialState, action: IAction) => {
  const handler = actionHandlers[action.type];
  return handler ? handler(state, action) : state;
}

export default reducer;
