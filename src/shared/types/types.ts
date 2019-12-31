// Global State
export type Actions = {
  type: ActionTypeEnum;
  currentlyViewing?: CurrentlyViewing;
};

export enum ActionTypeEnum {
  UpdateCurrentlyViewing = 'UPDATE_CURRENTLY_VIEWING',
}

export interface InitialState {
  currentlyViewing?: CurrentlyViewing;
}

// Navigation
export interface CurrentlyViewing {
  path: string;
  title: string;
  subTitle?: string;
  backPath?: string;
}
