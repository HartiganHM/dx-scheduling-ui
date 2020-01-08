// Global State
export type Actions = {
  type: ActionTypesEnum;
  currentlyViewing: CurrentlyViewing;
};

export enum ActionTypesEnum {
  UpdateCurrentlyViewing = 'UPDATE_CURRENTLY_VIEWING',
}

export interface InitialState {
  currentlyViewing: CurrentlyViewing;
}

// Navigation
export interface CurrentlyViewing {
  path: string;
  title: string;
  subTitle?: string;
  backPath?: string;
}
