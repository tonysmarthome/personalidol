// @flow

import * as React from "react";

import HudSceneCanvas from "./HudSceneCanvas";
// import HudSceneLocationRoom from "./HudSceneLocationRoom";

import type { Debugger } from "../framework/interfaces/Debugger";
import type { ExceptionHandler } from "../framework/interfaces/ExceptionHandler";
import type { KeyboardState } from "../framework/interfaces/KeyboardState";
import type { LoggerBreadcrumbs } from "../framework/interfaces/LoggerBreadcrumbs";
import type { Scheduler } from "../framework/interfaces/Scheduler";

type Props = {|
  debug: Debugger,
  exceptionHandler: ExceptionHandler,
  keyboardState: KeyboardState,
  loggerBreadcrumbs: LoggerBreadcrumbs,
  scheduler: Scheduler
|};

export default React.memo<Props>(function HudScene(props: Props) {
  return (
    <HudSceneCanvas
      debug={props.debug}
      exceptionHandler={props.exceptionHandler}
      keyboardState={props.keyboardState}
      loggerBreadcrumbs={props.loggerBreadcrumbs}
      scheduler={props.scheduler}
    />
  );
});
