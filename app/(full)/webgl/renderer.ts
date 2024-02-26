import Phenomenon from "phenomenon";

type InstanceProps = Phenomenon["add"] extends (a: any, props: infer P) => any
  ? P
  : never;
type ExtendedInstanceProps = InstanceProps & {
  onRender: (instance: Instance) => void;
};
type Instance = ReturnType<Phenomenon["add"]>;

const multiplier = 40000;
const begin = 0.4;
const duration = 0.6;

function h2r(p: number, q: number, t: number) {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * 6 * (2 / 3 - t);
  return p;
}

function getHSL(h: number, s: number, l: number) {
  h = ((h % 1) + 1) % 1;
  s = Math.max(0, Math.min(1, s));
  l = Math.max(0, Math.min(1, l));
  if (s === 0) return [l, l, l];
  const p = l <= 0.5 ? l * (1 + s) : l + s - l * s;
  const q = 2 * l - p;
  return [h2r(q, p, h + 1 / 3), h2r(q, p, h), h2r(q, p, h - 1 / 3)];
}

function getRandom(value: number) {
  const floor = -value;
  return floor + Math.random() * value * 2;
}

const vertex = `
  attribute vec3 aPositionStart;
  attribute vec3 aControlPointOne;  
  attribute vec3 aControlPointTwo;  
  attribute vec3 aPositionEnd;  
  attribute vec3 aPosition;  
  attribute vec3 aColor;  
  attribute float aOffset;  

  uniform float uProgress;
  uniform mat4 uProjectionMatrix;
  uniform mat4 uModelMatrix;
  uniform mat4 uViewMatrix;

  varying vec3 vColor;

  vec3 bezier4(vec3 a, vec3 b, vec3 c, vec3 d, float t) {
    return mix(mix(mix(a, b, t), mix(b, c, t), t), mix(mix(b, c, t), mix(c, d, t), t), t);
  }

  void main(){
    float tProgress = min(1.0, max(0.0, (uProgress - aOffset)) / ${duration});
    vec3 newPosition = bezier4(aPositionStart, aControlPointOne, aControlPointTwo, aPositionEnd, tProgress);
    gl_PointSize = 4.0;
    gl_Position = uProjectionMatrix * uModelMatrix * uViewMatrix * vec4(newPosition + aPosition, 1.0);
    vColor = aColor;
  }
`;

const fragment = `
  precision mediump float;

  varying vec3 vColor;

  void main(){
    gl_FragColor = vec4(vColor, 1.0);
  }
`;

export function createRenderer(canvas: HTMLCanvasElement): Phenomenon {
  const renderer = new Phenomenon({
    canvas,
    settings: {
      clearColor: [5 / 255, 100 / 255, 100 / 255, 1],
      position: { x: 0, y: 0, z: 1.2 },
      shouldRender: true,
    },
  });

  const attributes: InstanceProps["attributes"] = [
    {
      name: "aPositionStart",
      data: () => {
        return [0, -1, 0];
      },
      size: 3,
    },
    {
      name: "aControlPointOne",
      data: (index: number, total: number) => {
        const angle = index * ((2 * Math.PI) / total);
        return [
          Math.cos(angle) * 1.5 + getRandom(0.5),
          1.5 + getRandom(0.5),
          Math.sin(angle) * 1.5,
        ];
      },
      size: 3,
    },
    {
      name: "aControlPointTwo",
      data: (index: number, total: number) => {
        const angle = index * ((2 * Math.PI) / total);
        return [
          Math.cos(angle) + getRandom(1),
          1 + getRandom(0.5),
          Math.sin(angle) + getRandom(1),
        ];
      },
      size: 3,
    },
    {
      name: "aPositionEnd",
      data: (index: number, total: number) => {
        const angle = index * ((2 * Math.PI) / total);
        return [Math.cos(angle) + getRandom(2), -2, 0];
      },
      size: 3,
    },
    {
      name: "aColor",
      data: (index: number, total: number) =>
        getHSL(
          begin + (index / total) * 0.2,
          0.6 + getRandom(0.1),
          0.6 + getRandom(0.1)
        ),
      size: 3,
    },
    {
      name: "aOffset",
      data: (i: number) => [i * ((1 - duration) / (multiplier - 1))],
      size: 1,
    },
  ];

  const uniforms: InstanceProps["uniforms"] = {
    uProgress: {
      type: "float",
      value: [0.0],
    },
  };

  renderer.add("starling", {
    attributes,
    multiplier,
    uniforms,
    vertex,
    fragment,
    onRender(instance) {
      const uProgress = instance.uniforms.uProgress;

      uProgress.value[0] += 0.004;
      if (uProgress.value[0] >= 1.2) {
        uProgress.value[0] = 0;
      }
    },
  } as ExtendedInstanceProps);

  return renderer;
}
