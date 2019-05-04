// @flow

import ElementSize from "./ElementSize";
import ElementPosition from "./ElementPosition";
import ElementRotation from "./ElementRotation";
import TiledMapBlockObject from "./TiledMapBlockObject";
import TiledMapPositionedObject from "./TiledMapPositionedObject";
import TiledMapBlockObjectUnserializer from "./TiledMapBlockObjectUnserializer";

it("is comparable with other block objects", function() {
  const elementPosition1 = new ElementPosition(1, 1);
  const elementRotation1 = new ElementRotation<"radians">(1, 1, 1);
  const tiledMapPositionedObject1 = new TiledMapPositionedObject(
    "test",
    elementPosition1,
    elementRotation1
  );
  const elementSize1 = new ElementSize(1, 1);
  const tiledMapBlockObject1 = new TiledMapBlockObject(
    tiledMapPositionedObject1,
    elementSize1
  );

  const elementPosition2 = new ElementPosition(2, 2);
  const elementRotation2 = new ElementRotation<"radians">(2, 2, 2);
  const tiledMapPositionedObject2 = new TiledMapPositionedObject(
    "test",
    elementPosition2,
    elementRotation2
  );
  const elementSize2 = new ElementSize(2, 2);
  const tiledMapBlockObject2 = new TiledMapBlockObject(
    tiledMapPositionedObject2,
    elementSize2
  );

  expect(tiledMapBlockObject1.isEqual(tiledMapBlockObject2)).toBe(false);
});

it("is serializable as JSON", function() {
  const elementPosition = new ElementPosition(1, 1);
  const elementRotation = new ElementRotation<"radians">(1, 1, 1);
  const tiledMapPositionedObject = new TiledMapPositionedObject(
    "test",
    elementPosition,
    elementRotation
  );
  const elementSize = new ElementSize(1, 1);
  const tiledMapBlockObject = new TiledMapBlockObject(
    tiledMapPositionedObject,
    elementSize
  );

  const serialized = tiledMapBlockObject.asJson();
  const unserializer = new TiledMapBlockObjectUnserializer();
  const unserialized = unserializer.fromJson(serialized);

  expect(tiledMapBlockObject.isEqual(unserialized)).toBe(true);
});
