// @flow

import * as React from "react";

import CancelToken from "../framework/classes/CancelToken";
import Dialogue from "./Dialogue";
import DialogueQuery from "../framework/classes/Query/Dialogue";
import DialogueSpinner from "./DialogueSpinner";
// import { default as DialogueClass } from "../framework/classes/Dialogue";

import type { ExpressionBus } from "../framework/interfaces/ExpressionBus";
import type { ExpressionContext } from "../framework/interfaces/ExpressionContext";
import type { ExceptionHandler } from "../framework/interfaces/ExceptionHandler";
import type { Identifiable } from "../framework/interfaces/Identifiable";
import type { LoggerBreadcrumbs } from "../framework/interfaces/LoggerBreadcrumbs";
import type { QueryBus } from "../framework/interfaces/QueryBus";
import type { Speaks } from "../framework/interfaces/Sentient/Speaks";

type Props = {|
  dialogueInitiator: Identifiable & Speaks,
  dialogueResourceReference: string,
  exceptionHandler: ExceptionHandler,
  expressionBus: ExpressionBus,
  expressionContext: ExpressionContext,
  loggerBreadcrumbs: LoggerBreadcrumbs,
  queryBus: QueryBus,
|};

export default React.memo<Props>(function DialogueLoader(props: Props) {
  const [dialogue, setDialogue] = React.useState(null);
  const [isDialogueEnded, setIsDialogueEnded] = React.useState<boolean>(false);

  React.useEffect(
    function() {
      const cancelToken = new CancelToken(props.loggerBreadcrumbs.add("DialogueQuery"));
      const query = new DialogueQuery(props.expressionBus, props.expressionContext, props.dialogueResourceReference);

      props.queryBus
        .enqueue(cancelToken, query)
        .whenExecuted()
        .then(setDialogue);

      return function() {
        cancelToken.cancel(props.loggerBreadcrumbs.add("React.useEffect").add("cleanup"));
      };
    },
    [props.dialogueResourceReference, props.expressionBus, props.exceptionHandler, props.expressionContext, props.loggerBreadcrumbs, props.queryBus]
  );

  if (!dialogue) {
    return <DialogueSpinner label="Loading dialogue..." />;
  }

  if (isDialogueEnded) {
    return (
      <div className="dd__dialogue dd__dialogue--hud dd__frame">
        <div className="dd__dialogue__end">Koniec dialogu.</div>
      </div>
    );
  }

  return (
    <Dialogue
      dialogue={dialogue}
      dialogueInitiator={props.dialogueInitiator}
      exceptionHandler={props.exceptionHandler}
      onDialogueEnd={setIsDialogueEnded}
      loggerBreadcrumbs={props.loggerBreadcrumbs.add("Dialogue")}
    />
  );
});
