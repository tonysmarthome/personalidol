// @flow

import * as React from "react";
import autoBind from "auto-bind";

type Props = {||};

type State = {||};

export default class HudAside extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    autoBind.react(this);
  }

  render() {
    return (
      <div className="dd__aside dd__aside--hud dd__frame">
        <div className="dd__aside__portrait dd__aside__portrait--active">
          <img
            alt="arthurian knight"
            className="dd__aside__portrait__image"
            src="/assets/portrait-arthurian-knight.png"
          />
          <ul className="dd__aside__portrait__statuses">
            <li className="dd__aside__portrait__status dd__frame dd__frame--inset" />
            <li className="dd__aside__portrait__status dd__frame dd__frame--inset" />
            <li className="dd__aside__portrait__status dd__frame dd__frame--inset" />
            <li className="dd__aside__portrait__status dd__frame dd__frame--inset" />
            <li className="dd__aside__portrait__status dd__frame dd__frame--inset" />
            <li className="dd__aside__portrait__status dd__frame dd__frame--inset" />
            <li className="dd__aside__portrait__status dd__frame dd__frame--inset" />
            <li className="dd__aside__portrait__status dd__frame dd__frame--inset" />
          </ul>
        </div>
        <div className="dd__aside__portrait">
          <img
            alt="eduard charlemont moorish chief"
            className="dd__aside__portrait__image"
            src="/assets/portrait-eduard-charlemont-moorish-chief.jpg"
          />
          <ul className="dd__aside__portrait__statuses">
            <li className="dd__aside__portrait__status dd__frame dd__frame--inset" />
            <li className="dd__aside__portrait__status dd__frame dd__frame--inset" />
            <li className="dd__aside__portrait__status dd__frame dd__frame--inset" />
            <li className="dd__aside__portrait__status dd__frame dd__frame--inset" />
            <li className="dd__aside__portrait__status dd__frame dd__frame--inset" />
            <li className="dd__aside__portrait__status dd__frame dd__frame--inset" />
            <li className="dd__aside__portrait__status dd__frame dd__frame--inset" />
            <li className="dd__aside__portrait__status dd__frame dd__frame--inset" />
          </ul>
        </div>
        <div className="dd__aside__portrait">
          <img
            alt="veiled circassian beauty"
            className="dd__aside__portrait__image"
            src="/assets/portrait-veiled-circassian-beauty.jpg"
          />
          <ul className="dd__aside__portrait__statuses">
            <li className="dd__aside__portrait__status dd__frame dd__frame--inset" />
            <li className="dd__aside__portrait__status dd__frame dd__frame--inset" />
            <li className="dd__aside__portrait__status dd__frame dd__frame--inset" />
            <li className="dd__aside__portrait__status dd__frame dd__frame--inset" />
            <li className="dd__aside__portrait__status dd__frame dd__frame--inset" />
            <li className="dd__aside__portrait__status dd__frame dd__frame--inset" />
            <li className="dd__aside__portrait__status dd__frame dd__frame--inset" />
            <li className="dd__aside__portrait__status dd__frame dd__frame--inset" />
          </ul>
        </div>
      </div>
    );
  }
}
