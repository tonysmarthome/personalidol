// @flow

import isEqualWithPrecision from "../helpers/isEqualWithPrecision";

import type { ElementSize } from "../interfaces/ElementSize";
import type { HTMLElementSize as HTMLElementSizeInterface } from "../interfaces/HTMLElementSize";

export default class HTMLElementSize implements HTMLElementSizeInterface {
  +htmlElement: HTMLElement;
  +htmlElementHeight: number;
  +htmlElementScrollHeight: number;
  +htmlElementWidth: number;

  constructor(htmlElement: HTMLElement) {
    this.htmlElement = htmlElement;
    this.htmlElementHeight = htmlElement.offsetHeight;
    this.htmlElementScrollHeight = htmlElement.scrollHeight;
    this.htmlElementWidth = htmlElement.offsetWidth;
  }

  getBaseArea(): number {
    return this.getHeight() * this.getWidth();
  }

  getAspect(): number {
    return this.getWidth() / this.getHeight();
  }

  getDepth(): 0 {
    return 0;
  }

  getHTMLElement(): HTMLElement {
    return this.htmlElement;
  }

  getHeight(): number {
    return this.htmlElementHeight;
  }

  getScrollHeight(): number {
    return this.htmlElementScrollHeight;
  }

  getWidth(): number {
    return this.htmlElementWidth;
  }

  isEqual(other: ElementSize<"px">): boolean {
    return this.getHeight() === other.getHeight() && this.getWidth() === other.getWidth();
  }

  isEqualWithPrecision(other: ElementSize<"px">, precision: number): boolean {
    return isEqualWithPrecision(this.getHeight(), other.getHeight(), precision) && isEqualWithPrecision(this.getWidth(), other.getWidth(), precision);
  }
}
