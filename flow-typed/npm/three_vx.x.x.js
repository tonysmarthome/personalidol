// flow-typed signature: 581d51882ceaf04b7b0cf10a33bc9b24
// flow-typed version: <<STUB>>/three_v0.101.1/flow_v0.89.0

/**
 * This is an autogenerated libdef stub for:
 *
 *   'three'
 *
 * Fill this stub out by replacing all the `any` types.
 *
 * Once filled out, we encourage you to share your work with the
 * community by sending a pull request to:
 * https://github.com/flowtype/flow-typed
 */

declare module 'three' {
  declare type RepeatWrapping = 1000;

  declare interface AmbientLight extends Light {
    +isAmbientLight: true;
    castShadow: boolean;

    constructor(color?: number, intensity?: number): void;
  }

  declare interface BoxGeometry extends Geometry {
    parameters: {|
      depth: number,
      depthSegments: number,
      height: number,
      heightSegments: number,
      width: number,
      widthSegments: number,
    |};

    constructor(
      width?: number,
      height?: number,
      depth?: number,
      widthSegments?: number,
      heightSegments?: number,
      depthSegments?: number
    ): void;
  }

  declare interface Camera extends Object3D {
    +isCamera: true;

    constructor(): void;
  }

  declare interface Euler {
    +isEuler: true;
    x: number;
    y: number;
    z: number;

    constructor(number, number, number): void;
  }

  declare interface Geometry {
    isGeometry: true;

    constructor(): void;

    dispose(): void;

    scale(x: number, y: number, z: number): Geometry;

    translate(x: number, y: number, z: number): Geometry;
  }

  declare interface Light extends Object3D {
    +isLight: true;
    intensity: number;
  }

  declare interface Material extends Geometry {
  }

  declare interface Mesh extends Object3D {
    constructor(Geometry, Material): void;
  }

  declare interface MeshBasicMaterial extends Material {
    constructor({|
      map: Texture,
    |}): void;
  }

  declare interface MeshNormalMaterial extends Material {
    constructor(): void;
  }

  declare interface MeshPhongMaterial extends Material {
    constructor({|
      map: Texture,
    |}): void;
  }

  declare interface Object3D {
    +position: Vector3;
    +rotation: Euler;
    +scale: Vector3;
  }

  declare interface PerspectiveCamera extends Camera {
    aspect: number;

    constructor(
      fov: number,
      aspect: number,
      near: number,
      far: number
    ): void;

    updateProjectionMatrix(): void;
  }

  declare interface PointLight extends Light {
    +isPointLight: true;
    +position: Vector3;

    constructor(color?: number, intensity?: number, distance?: number, decay?: number): void;
  }

  declare interface Renderer {
    render(Scene, Camera): void;

    getSize(): {|
      height: number,
      width: number,
    |};

    setSize(number, number, ?boolean): void;
  }

  declare interface Scene extends Object3D {
    constructor(): void;

    add(Object3D): void;

    remove(Object3D): void;
  }

  declare interface Texture extends Geometry {
    wrapS: RepeatWrapping;
    wrapT: RepeatWrapping;
  }

  declare interface TextureLoader {
    constructor(): void;

    load(url: string, onLoad?: Function, onProgress?: Function, onError?: Function): Texture;
  }

  declare interface Vector3 {
    +isVector: true;
    x: number;
    y: number;
    z: number;

    constructor(number, number, number): void;

    set(number, number, number): Vector3;
  }

  declare interface WebGLRenderer extends Renderer {
    constructor({|
      alpha?: boolean,
      canvas?: HTMLCanvasElement,
      depth?: boolean,
      logarithmicDepthBuffer?: boolean,
      powerPreference?: "high-performance" | "low-power" | "default",
      precision?: "highp" | "mediump" | "lowp",
      premultipliedAlpha?: boolean,
      stencil?: boolean,
    |}): void;
  }

  declare module.exports: {|
    AmbientLight: AmbientLight,
    BoxGeometry: BoxGeometry,
    Mesh: Mesh,
    MeshBasicMaterial: MeshBasicMaterial,
    MeshNormalMaterial: MeshNormalMaterial,
    MeshPhongMaterial: MeshPhongMaterial,
    PerspectiveCamera: PerspectiveCamera,
    PointLight: PointLight,
    RepeatWrapping: RepeatWrapping,
    Scene: Scene,
    TextureLoader: TextureLoader,
    WebGLRenderer: WebGLRenderer,
  |};
}
