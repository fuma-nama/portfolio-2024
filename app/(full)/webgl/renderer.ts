import Phenomenon from "phenomenon";

type InstanceProps = Phenomenon["add"] extends (a: any, props: infer P) => any
  ? P
  : never;
type ExtendedInstanceProps = InstanceProps & {
  onRender: (instance: Instance) => void;
};
type Instance = ReturnType<Phenomenon["add"]>;

const vertex = `
  precision mediump float;
  attribute vec3 aPosition;

  void main(){
    gl_Position = vec4(aPosition, 1.);
  }
`;

// Ether by nimitz 2014 (twitter: @stormoid)
// https://www.shadertoy.com/view/MsjSW3
// License Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License

const fragment = `
precision mediump float;
uniform float u_time;
uniform vec2 u_resolution;

mat2 m(float a){
  float c=cos(a);
  float s=sin(a);
  return mat2(c,-s,s,c);
}

float map(vec3 p){
    p.xz*= m(u_time*0.4);p.xy*= m(u_time*0.3);
    vec3 q = p*2.+u_time;
    return length(p+vec3(sin(u_time*0.7)))*log(length(p)+1.) + sin(q.x+sin(q.z+sin(q.y)))*0.5 - 1.;
}

void main(){	
	vec2 p = gl_FragCoord.xy/u_resolution.y - vec2((u_resolution.x/2.0 - 2.5)/u_resolution.y,.5);
  vec3 cl = vec3(0.);
  float d = 2.5;
  for(int i=0; i<=5; i++)	{
		vec3 p = vec3(0,0,5.) + normalize(vec3(p, -1.))*d;
        float rz = map(p);
		float f =  clamp((rz - map(p+.1))*0.5, -.1, 1. );
        vec3 l = vec3(0.1,0.3,.4) + vec3(5., 2.5, 3.)*f;
        cl = cl*l + smoothstep(2.5, .0, rz)*.7*l;
		d += min(rz, 1.);
	}

  gl_FragColor = vec4(cl, 1.);
}
`;

export function createRenderer(canvas: HTMLCanvasElement): Phenomenon {
  const renderer = new Phenomenon({
    canvas,
    settings: {
      alpha: true,
      position: { x: 0, y: 0, z: 1 },
      shouldRender: true,
    },
  });

  renderer.add("starling", {
    mode: 4,
    vertex,
    geometry: {
      vertices: [
        { x: -100, y: 100, z: 0 },
        { x: -100, y: -100, z: 0 },
        { x: 100, y: 100, z: 0 },
        { x: 100, y: -100, z: 0 },
        { x: -100, y: -100, z: 0 },
        { x: 100, y: 100, z: 0 },
      ] as unknown as object[][],
    },
    fragment,
    uniforms: {
      u_resolution: {
        type: "vec2",
        value: [
          canvas.width * window.devicePixelRatio,
          canvas.height * window.devicePixelRatio,
        ],
      },
      u_time: {
        type: "float",
        value: [0.0],
      },
    },
    onRender: ({ uniforms }) => {
      uniforms.u_time.value[0] += 0.01;
    },
  } as ExtendedInstanceProps);

  return renderer;
}
