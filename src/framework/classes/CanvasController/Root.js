// @flow

import * as THREE from "three";
import autoBind from "auto-bind";

import CameraController from "../CameraController";
import CanvasController from "../CanvasController";
import CanvasPointerController from "../CanvasPointerController";
import ElementSize from "../ElementSize";
import THREEPointerInteraction from "../THREEPointerInteraction";
// import { default as AmbientLightView } from "../CanvasView/AmbientLight";
import { default as TiledMapView } from "../CanvasView/TiledMap";

import type { OrthographicCamera, Scene, WebGLRenderer } from "three";

import type { CameraController as CameraControllerInterface } from "../../interfaces/CameraController";
import type { CanvasControllerBus } from "../../interfaces/CanvasControllerBus";
import type { CanvasPointerController as CanvasPointerControllerInterface } from "../../interfaces/CanvasPointerController";
import type { CanvasViewBag } from "../../interfaces/CanvasViewBag";
import type { Debugger } from "../../interfaces/Debugger";
import type { ElementSize as ElementSizeInterface } from "../../interfaces/ElementSize";
import type { KeyboardState } from "../../interfaces/KeyboardState";
import type { LoadingManager } from "../../interfaces/LoadingManager";
import type { LoggerBreadcrumbs } from "../../interfaces/LoggerBreadcrumbs";
import type { PointerState } from "../../interfaces/PointerState";
import type { QueryBus } from "../../interfaces/QueryBus";
import type { Scheduler } from "../../interfaces/Scheduler";
import type { THREELoadingManager } from "../../interfaces/THREELoadingManager";
import type { THREEPointerInteraction as THREEPointerInteractionInterface } from "../../interfaces/THREEPointerInteraction";

export default class Root extends CanvasController {
  +camera: OrthographicCamera;
  +cameraController: CameraControllerInterface;
  +canvasControllerBus: CanvasControllerBus;
  +canvasPointerController: CanvasPointerControllerInterface;
  +debug: Debugger;
  +keyboardState: KeyboardState;
  +loadingManager: LoadingManager;
  +loggerBreadcrumbs: LoggerBreadcrumbs;
  +queryBus: QueryBus;
  +renderer: WebGLRenderer;
  +scene: Scene;
  +scheduler: Scheduler;
  +threeLoadingManager: THREELoadingManager;
  +threePointerInteraction: THREEPointerInteractionInterface;

  constructor(
    canvasControllerBus: CanvasControllerBus,
    canvasViewBag: CanvasViewBag,
    debug: Debugger,
    keyboardState: KeyboardState,
    loadingManager: LoadingManager,
    loggerBreadcrumbs: LoggerBreadcrumbs,
    pointerState: PointerState,
    queryBus: QueryBus,
    renderer: WebGLRenderer,
    scheduler: Scheduler,
    threeLoadingManager: THREELoadingManager
  ) {
    super(canvasViewBag);
    autoBind(this);

    this.camera = new THREE.OrthographicCamera();
    this.canvasControllerBus = canvasControllerBus;
    this.debug = debug;
    this.keyboardState = keyboardState;
    this.loadingManager = loadingManager;
    this.loggerBreadcrumbs = loggerBreadcrumbs;
    this.queryBus = queryBus;
    this.renderer = renderer;
    this.scene = new THREE.Scene();
    this.scheduler = scheduler;
    this.cameraController = new CameraController(
      this.camera,
      debug,
      loggerBreadcrumbs,
      renderer,
      this.scene,
      new ElementSize<"px">(0, 0)
    );
    this.threeLoadingManager = threeLoadingManager;
    this.threePointerInteraction = new THREEPointerInteraction(renderer, this.camera);
    this.canvasPointerController = new CanvasPointerController(
      pointerState,
      this.threePointerInteraction.getCameraRaycaster(),
      this.scene
    );
  }

  async attach(): Promise<void> {
    await super.attach();

    const tiledMapView = new TiledMapView(
      this.canvasViewBag.fork(this.loggerBreadcrumbs.add("TiledMapView")),
      this.debug,
      this.loadingManager,
      this.loggerBreadcrumbs.add("TiledMapView"),
      this.queryBus,
      this.scene,
      this.threeLoadingManager
    );
    await this.loadingManager.blocking(this.canvasViewBag.add(tiledMapView), "Loading map");

    // const ambientLightView = new AmbientLightView(
    //   this.canvasViewBag.fork(this.loggerBreadcrumbs.add("AmbientLightView")),
    //   this.debug,
    //   this.loggerBreadcrumbs.add("AmbientLightView"),
    //   this.scene
    // );
    // await this.loadingManager.blocking(this.canvasViewBag.add(ambientLightView), "Loading ambient light");

    await this.cameraController.attach();

    this.scheduler.onBegin(this.canvasPointerController.begin);
    this.scheduler.onDraw(this.cameraController.draw);
    this.scheduler.onUpdate(this.threePointerInteraction.update);
    this.threePointerInteraction.observe();
  }

  async dispose(): Promise<void> {
    await super.dispose();

    this.scheduler.offBegin(this.canvasPointerController.begin);
    this.scheduler.offDraw(this.cameraController.draw);
    this.scheduler.offUpdate(this.threePointerInteraction.update);

    await this.cameraController.dispose();

    // redraw once more after cleaning views etc
    this.draw(0);

    this.threePointerInteraction.disconnect();
    this.scene.dispose();
    this.debug.deleteState(this.loggerBreadcrumbs.add("camera").add("position"));
  }

  draw(interpolationPercentage: number): void {
    super.draw(interpolationPercentage);

    this.renderer.render(this.scene, this.camera);
  }

  resize(elementSize: ElementSizeInterface<"px">): void {
    super.resize(elementSize);

    const height = elementSize.getHeight();
    const width = elementSize.getWidth();

    this.renderer.setSize(width, height);
    this.cameraController.setViewportSize(elementSize);
    this.threePointerInteraction.resize(elementSize);
  }
}