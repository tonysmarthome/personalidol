// @flow

import isArrayEqual from "./isArrayEqual";
import LoggerBreadcrumbs from "../classes/LoggerBreadcrumbs";

import type { Equatable } from "../interfaces/Equatable";

class Foo implements Equatable<Foo> {
  +value: number;

  constructor(value: number) {
    this.value = value;
  }

  getValue(): number {
    return this.value;
  }

  isEqual(other: Foo): boolean {
    return this.getValue() === other.getValue();
  }
}

test.each([
  [[new Foo(1), new Foo(2), new Foo(3)], [new Foo(3), new Foo(2), new Foo(1)], true],
  [[new Foo(1), new Foo(2), new Foo(3)], [new Foo(3), new Foo(2), new Foo(2)], false],
])("checks if arrays of items are equal", function(a, b, result) {
  const loggerBreadcrumbs = new LoggerBreadcrumbs();

  expect(isArrayEqual(loggerBreadcrumbs, a, b)).toBe(result);
});
