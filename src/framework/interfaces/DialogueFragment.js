// @flow

export interface DialogueFragment {
  actor(): Promise<string>;

  prompt(): Promise<string>;
}
