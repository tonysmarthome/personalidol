// @flow

import * as React from "react";
import classnames from "classnames";

import DebuggerListing from "./DebuggerListing";
import DialogueLoader from "./DialogueLoader";
import HudAside from "./HudAside";
import HudModalRouter from "./HudModalRouter";
import HudScene from "./HudScene";
import HudToolbar from "./HudToolbar";
import Person from "../framework/classes/Entity/Person";

import type { Debugger } from "../framework/interfaces/Debugger";
import type { ExceptionHandler } from "../framework/interfaces/ExceptionHandler";
import type { Game } from "../framework/interfaces/Game";
import type { Logger } from "../framework/interfaces/Logger";
import type { LoggerBreadcrumbs } from "../framework/interfaces/LoggerBreadcrumbs";
// import type { QueryBus as QueryBusInterface } from "../framework/interfaces/QueryBus";

type Props = {|
  debug: Debugger,
  exceptionHandler: ExceptionHandler,
  game: Game,
  logger: Logger,
  loggerBreadcrumbs: LoggerBreadcrumbs,
|};

export default function Main(props: Props) {
  const [dialogueInitiator] = React.useState(new Person("Laelaps"));
  const [dialogueResourceReference] = React.useState("/data/dialogues/hermit-intro.yml");

  const expressionBus = props.game.getExpressionBus();
  const expressionContext = props.game.getExpressionContext();
  const queryBus = props.game.getQueryBus();

  return (
    <React.Fragment>
      <div className={classnames("dd__container", "dd__hud")}>
        <HudAside />
        <DialogueLoader
          dialogueResourceReference={dialogueResourceReference}
          dialogueInitiator={dialogueInitiator}
          exceptionHandler={props.exceptionHandler}
          expressionBus={expressionBus}
          expressionContext={expressionContext}
          logger={props.logger}
          loggerBreadcrumbs={props.loggerBreadcrumbs.add("DialogueLoader")}
          queryBus={queryBus}
        />
        <HudScene
          debug={props.debug}
          exceptionHandler={props.exceptionHandler}
          game={props.game}
          loggerBreadcrumbs={props.loggerBreadcrumbs.add("HudScene")}
          queryBus={queryBus}
          scheduler={props.game.getScheduler()}
        />
        <div className="dd__frame dd__statusbar dd__statusbar--hud">
          Thalantyr: szansa na zadanie obrażeń 56%. Intuicja podpowiada ci, że będzie przyjaźnie nastawiony.
        </div>
        <HudToolbar />
        <HudModalRouter
          exceptionHandler={props.exceptionHandler}
          logger={props.logger}
          loggerBreadcrumbs={props.loggerBreadcrumbs.add("HudModalRouter")}
          queryBus={queryBus}
        />
      </div>
      <DebuggerListing debug={props.debug} />
    </React.Fragment>
  );
}
