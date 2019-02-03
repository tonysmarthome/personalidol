// @flow

import * as React from "react";
import autoBind from "auto-bind";

import CancelToken from "../framework/classes/CancelToken";
import Dialogue from "./Dialogue";
import DialogueQuery from "../framework/classes/Query/Dialogue";
import DialogueResourceReference from "../framework/classes/ResourceReference/Dialogue";
import DialogueSpinner from "./DialogueSpinner";
import { default as DialogueClass } from "../framework/classes/Dialogue";

import type { ExpressionBus } from "../framework/interfaces/ExpressionBus";
import type { ExpressionContext } from "../framework/interfaces/ExpressionContext";
import type { Identifiable } from "../framework/interfaces/Identifiable";
import type { Logger } from "../framework/interfaces/Logger";
import type { QueryBus } from "../framework/interfaces/QueryBus";
import type { Speaks } from "../framework/interfaces/Sentient/Speaks";

type Props = {|
  dialogueInitiator: Identifiable & Speaks,
  dialogueResourceReference: DialogueResourceReference,
  expressionBus: ExpressionBus,
  expressionContext: ExpressionContext,
  logger: Logger,
  onDialogueBoxSizeDecrease: () => any,
  onDialogueBoxSizeIncrease: () => any,
  queryBus: QueryBus
|};

type State = {|
  cancelToken: CancelToken,
  dialogue: ?DialogueClass,
  isDialogueEnded: boolean,
  isLoading: boolean
|};

export default class DialogueLoader extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    autoBind.react(this);

    this.state = {
      cancelToken: new CancelToken(),
      dialogue: null,
      isDialogueEnded: false,
      isLoading: true
    };
  }

  async componentDidMount(): Promise<void> {
    const query = new DialogueQuery(
      this.props.expressionBus,
      this.props.expressionContext,
      this.props.dialogueResourceReference
    );

    try {
      this.setState({
        dialogue: await this.props.queryBus.enqueue(
          this.state.cancelToken,
          query
        )
      });
    } catch (e) {
      this.props.logger.notice(e.message);
    }
  }

  componentWillUnmount(): void {
    this.state.cancelToken.cancel();
  }

  onDialogueEnd(): void {
    this.setState({
      isDialogueEnded: true
    });
  }

  render() {
    const dialogue = this.state.dialogue;

    if (!dialogue) {
      return <DialogueSpinner />;
    }

    if (this.state.isDialogueEnded) {
      return <div className="dd__dialogue__end">Koniec dialogu.</div>;
    }

    return (
      <Dialogue
        dialogue={dialogue}
        dialogueInitiator={this.props.dialogueInitiator}
        onDialogueBoxSizeDecrease={this.props.onDialogueBoxSizeDecrease}
        onDialogueBoxSizeIncrease={this.props.onDialogueBoxSizeIncrease}
        onDialogueEnd={this.onDialogueEnd}
        logger={this.props.logger}
      />
    );
  }
}
