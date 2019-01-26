// @flow

import type { DialogueFragment } from "./DialogueFragment";
import type { DialogueScriptMessage } from "../types/DialogueScriptMessage";
import type { Expression } from "./Expression";

export interface DialogueMessage extends DialogueFragment {
  condition(): ?Expression;

  key(): Promise<string>;

  answerTo(): Promise<Array<string>>;

  getMessageScript(): DialogueScriptMessage;

  isAnswerTo(DialogueMessage): Promise<boolean>;
}
