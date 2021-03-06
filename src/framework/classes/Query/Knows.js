// @flow

import type { Memorizable } from "../../interfaces/Memorizable";
import type { Memorizes } from "../../interfaces/Sentient/Perceives/Memorizes";
import type { Query } from "../../interfaces/Query";

export default class Knows implements Query<boolean> {
  memorizable: Memorizable;
  memorizes: Memorizes;

  constructor(memorizes: Memorizes, memorizable: Memorizable) {
    this.memorizable = memorizable;
    this.memorizes = memorizes;
  }

  async execute(): Promise<boolean> {
    return false;
  }

  isEqual(other: Knows): boolean {
    return false;
  }
}
