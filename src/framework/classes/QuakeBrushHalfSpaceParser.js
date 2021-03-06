// @flow

import QuakeBrushHalfSpace from "./QuakeBrushHalfSpace";
import QuakePointParser from "./QuakePointParser";
import { default as QuakeMapParserException } from "./Exception/QuakeMap/Parser";

import type { LoggerBreadcrumbs } from "../interfaces/LoggerBreadcrumbs";
import type { QuakeBrushHalfSpace as QuakeBrushHalfSpaceInterface } from "../interfaces/QuakeBrushHalfSpace";
import type { QuakeBrushHalfSpaceParser as QuakeBrushHalfSpaceParserInterface } from "../interfaces/QuakeBrushHalfSpaceParser";

const REGEXP_WHITESPACE = /\s+/;

export default class QuakeBrushHalfSpaceParser implements QuakeBrushHalfSpaceParserInterface {
  +line: string;
  +loggerBreadcrumbs: LoggerBreadcrumbs;

  constructor(loggerBreadcrumbs: LoggerBreadcrumbs, line: string) {
    this.line = line;
    this.loggerBreadcrumbs = loggerBreadcrumbs;
  }

  parse(): QuakeBrushHalfSpaceInterface {
    const parts = this.line.trim().split(REGEXP_WHITESPACE);

    if (parts.length !== 21) {
      throw new QuakeMapParserException(this.loggerBreadcrumbs.add("parse"), "Brush half-plane is in incorrect format.");
    }

    if (parts[0] !== parts[5] || parts[5] !== parts[10] || parts[0] !== "(") {
      throw new QuakeMapParserException(this.loggerBreadcrumbs.add("parse"), "Expected '(', got something else.");
    }

    if (parts[4] !== parts[9] || parts[9] !== parts[14] || parts[4] !== ")") {
      throw new QuakeMapParserException(this.loggerBreadcrumbs.add("parse"), "Expected ')', got something else.");
    }

    const v1Parser = new QuakePointParser(this.loggerBreadcrumbs.add("QuakePointParser"), `${parts[1]} ${parts[2]} ${parts[3]}`);
    const v1 = v1Parser.parse();

    const v2Parser = new QuakePointParser(this.loggerBreadcrumbs.add("QuakePointParser"), `${parts[6]} ${parts[7]} ${parts[8]}`);
    const v2 = v2Parser.parse();

    const v3Parser = new QuakePointParser(this.loggerBreadcrumbs.add("QuakePointParser"), `${parts[11]} ${parts[12]} ${parts[13]}`);
    const v3 = v3Parser.parse();

    return new QuakeBrushHalfSpace(
      v1,
      v2,
      v3,
      // texture
      String(parts[15]),
      // Texture x-offset (must be multiple of 16)
      Number(parts[16]),
      // Texture y-offset (must be multiple of 16)
      Number(parts[17]),
      // floating point value indicating texture rotation
      Number(parts[18]),
      // scales x-dimension of texture (negative value to flip)
      Number(parts[19]),
      // scales y-dimension of texture (negative value to flip)
      Number(parts[20])
    );
  }
}
