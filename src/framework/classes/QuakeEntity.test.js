// @flow

import * as THREE from "three";

import LoggerBreadcrumbs from "./LoggerBreadcrumbs";
import QuakeEntity from "./QuakeEntity";
import QuakeEntityProperties from "./QuakeEntityProperties";
import QuakeEntityProperty from "./QuakeEntityProperty";

it("determines if Entity belongs to a quake class", function() {
  const loggerBreadcrumbs = new LoggerBreadcrumbs();
  const quakeEntityProperties = new QuakeEntityProperties(loggerBreadcrumbs, [new QuakeEntityProperty("classname", "info_player_start")]);
  const quakeEntity = new QuakeEntity(loggerBreadcrumbs, quakeEntityProperties);

  expect(quakeEntity.isOfClass("info_player_start")).toBe(true);
});

it("is able to get entity origin translated to THREE coordinates", function() {
  const loggerBreadcrumbs = new LoggerBreadcrumbs();
  const quakeEntityProperties = new QuakeEntityProperties(loggerBreadcrumbs, [new QuakeEntityProperty("origin", "-32 -32 40")]);
  const quakeEntity = new QuakeEntity(loggerBreadcrumbs, quakeEntityProperties);

  expect(quakeEntity.hasOrigin()).toBe(true);

  const origin = new THREE.Vector3(-32, 40, 32);

  expect(quakeEntity.getOrigin().equals(origin)).toBe(true);
});
