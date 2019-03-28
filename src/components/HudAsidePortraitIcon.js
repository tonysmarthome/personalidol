// @flow

import * as React from "react";

type Props = {|
  name: string
|};

export default function HudAsidePortraitIcon(props: Props) {
  return (
    <li className="dd__aside__portrait__status dd__frame dd__frame--inset">
      <a
        className="dd__aside__portrait__status__icon"
        href={`#/character/${props.name.toLowerCase()}`}
      >
        <img
          alt="prayer"
          className="dd__aside__portrait__status__icon__image"
          src="/assets/icon-prayer.svg"
        />
        <div className="dd__aside__portrait__status__icon__tooltip">
          {props.name} modli się śpiewając "Hymn do nieznanego boga"
        </div>
      </a>
    </li>
  );
}