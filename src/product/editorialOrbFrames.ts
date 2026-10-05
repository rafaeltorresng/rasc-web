// Geometry transcribed from Rasc's MIT-licensed ThinkingOrbsKit px64/px20 presets.
// See public/THINKING-ORBS-LICENSE.txt. Color and crossfades are web treatments.
export const editorialOrbStates = ['breathing', 'connecting', 'shaping', 'composing'] as const;
export type EditorialOrbState = (typeof editorialOrbStates)[number];
type Vector = readonly [number, number, number];
type Point = readonly [number, number];
export type OrbDot = { x: number; y: number; z: number; r: number; white: number; a: number };
type OrbLine = { x1: number; y1: number; x2: number; y2: number; w: number; white: number; a: number };
export type OrbFrame = { dots: OrbDot[]; lines: OrbLine[] };
export const editorialOrbSpeeds: Record<EditorialOrbState, number> = {
  breathing: 3.24 * .48, connecting: 3.315 * .58, shaping: 2.405, composing: 2.34,
};
const size = 64;
const rs = Math.pow(size / 300, .6);
const tau = Math.PI * 2;
const frac = (x: number) => x - Math.floor(x);
const hash = (a: number, b: number) => frac(Math.sin(a * 12.9898 + b * 78.233) * 43758.5453);
export const easeOrb = (x: number) => x * x * (3 - 2 * x);
function noise(x: number, y: number) {
  const xi = Math.floor(x), yi = Math.floor(y);
  const fx = easeOrb(x - xi), fy = easeOrb(y - yi);
  const a = hash(xi, yi), b = hash(xi + 1, yi), c = hash(xi, yi + 1), d = hash(xi + 1, yi + 1);
  return a + (b - a) * fx + (c - a) * fy + (a - b - c + d) * fx * fy;
}
function project(yaw: number, tilt: number, scale = 1, center = size / 2) {
  const sy = Math.sin(yaw), cy = Math.cos(yaw), st = Math.sin(tilt), ct = Math.cos(tilt);
  return (x: number, y: number, z: number): Vector => {
    const x1 = x * cy + z * sy, z1 = -x * sy + z * cy;
    return [center + x1 * scale, center - (y * ct - z1 * st) * scale, y * st + z1 * ct];
  };
}
function finish(dots: OrbDot[], lines: OrbLine[] = []): OrbFrame {
  return { dots: dots.filter(dot => dot.a >= .02).map(dot => ({ ...dot, r: Math.max(.3, dot.r) })).sort((a, b) => a.z - b.z), lines: lines.filter(line => line.a >= .02) };
}
function breathing(t: number): OrbFrame {
  const radius = size * .39, baseRadius = radius / (1 + .85 * .23 * .368);
  const pt = project(0, .3), dots: OrbDot[] = [];
  // Native count .25: 3 base lanes, 44 segments; bandMul 3.627 → 11 lanes.
  for (let lane = 0; lane < 11; lane++) {
    const offset = (lane - 5) * .075, edge = Math.abs(lane - 5) / 5;
    for (let index = 0; index < 44; index++) {
      const a = index / 44 * tau;
      const wobble = (.16 * Math.sin(a * 3 - t * 1.7 + lane * .22) + .07 * Math.sin(a * 5 + t * 1.1)) * .368;
      const x = Math.cos(a), y = Math.cos(-.3) * Math.sin(a) - Math.sin(-.3) * offset;
      const z = Math.sin(-.3) * Math.sin(a) + Math.cos(-.3) * offset;
      const length = Math.hypot(x, y, z), r = baseRadius * (1 + wobble);
      const [px, py, depthZ] = pt(x / length * r, y / length * r, z / length * r);
      const depth = (depthZ / radius + 1) / 2;
      dots.push({ x: px, y: py, z: depthZ, r: (1.1 + 1.7 * depth) * .956 * (1 - .25 * edge) * rs,
        white: .52 - .44 * depth + .18 * edge, a: .4 + .6 * depth });
    }
  }
  return finish(dots);
}
function connecting(t: number): OrbFrame {
  const count = 41, radius = size * .4, pt = project(t * .12, .32, radius);
  const nodes: Vector[] = [];
  for (let i = 0; i < count; i++) {
    const y0 = 1 - 2 * (i + .5) / count, radial = Math.sqrt(1 - y0 * y0), angle = i * Math.PI * (3 - Math.sqrt(5));
    const x = radial * Math.cos(angle) + .6 * (noise(i * .31 + 9, t * .24) - .5);
    const y = y0 + .6 * (noise(i * .53 + 27, t * .21) - .5);
    const z = radial * Math.sin(angle) + .6 * (noise(i * .77 + 55, t * .27) - .5);
    const length = Math.hypot(x, y, z); nodes.push([x / length, y / length, z / length]);
  }
  const lines: OrbLine[] = [], dots: OrbDot[] = [];
  for (let i = 0; i < count; i++) {
    for (let j = i + 1; j < count; j++) {
      const distance = Math.hypot(...nodes[i].map((v, axis) => v - nodes[j][axis]));
      if (distance >= .72) continue;
      const [x1, y1, z1] = pt(...nodes[i]), [x2, y2, z2] = pt(...nodes[j]);
      const depth = ((z1 + z2) / 2 + 1) / 2;
      lines.push({ x1, y1, x2, y2, white: .42, a: (1 - distance / .72) * (.3 + .55 * depth), w: Math.max(.6, .8 * rs) });
    }
    const [x, y, z] = pt(...nodes[i]), depth = (z + 1) / 2;
    dots.push({ x, y, z, r: (1.4 + 1.8 * depth) * .95 * (1 + .25 * Math.sin(t * 1.4 + i * 2.7)) * rs, white: .55 - .45 * depth, a: 1 });
  }
  for (let i = 0; i < 7; i++) {
    const segment = Math.floor(t * .55 + i * 7.31);
    const a = Math.floor(hash(segment, i * 3.1 + 1.7) * count), b = Math.floor(hash(segment, i * 5.7 + 4.2) * count);
    if (a === b) continue;
    const part = frac(t * .55 + i * 7.31), position = nodes[a].map((v, axis) => v + (nodes[b][axis] - v) * part);
    const length = Math.max(1e-6, Math.hypot(...position));
    const [x, y, z] = pt(position[0] / length, position[1] / length, position[2] / length), depth = (z + 1) / 2;
    dots.push({ x, y, z, r: (1.4 * 1.5 + 1.8 * depth) * .95 * rs, white: .05, a: .5 + .5 * depth });
  }
  return finish(dots, lines);
}
function shapePoint(shape: number, progress: number): Point {
  if (shape === 0) return [Math.cos(-Math.PI / 2 + progress * tau) * .24, Math.sin(-Math.PI / 2 + progress * tau) * .24];
  const vertices: Point[] = shape === 1 ? [[0, -.26], [.24, .16], [-.24, .16]] : [[0, -.2], [.2, -.2], [.2, .2], [-.2, .2], [-.2, -.2]];
  const lengths = vertices.map((v, i) => Math.hypot(v[0] - vertices[(i + 1) % vertices.length][0], v[1] - vertices[(i + 1) % vertices.length][1]));
  let remaining = progress * lengths.reduce((a, b) => a + b, 0), index = 0;
  while (index < vertices.length - 1 && remaining > lengths[index]) remaining -= lengths[index++];
  const a = vertices[index], b = vertices[(index + 1) % vertices.length], part = Math.min(1, remaining / lengths[index]);
  return [a[0] + (b[0] - a[0]) * part, a[1] + (b[1] - a[1]) * part];
}
function shaping(t: number): OrbFrame {
  const local = t % 2.3, index = Math.floor(t / 2.3) % 3, morph = local > 1.4 ? easeOrb((local - 1.4) / .9) : 0;
  const path = Array.from({ length: 160 }, (_, i): Point => {
    const a = shapePoint(index, i / 160), b = shapePoint((index + 1) % 3, i / 160);
    return [(a[0] + (b[0] - a[0]) * morph) * 1.45, (a[1] + (b[1] - a[1]) * morph) * 1.45];
  });
  const lengths = path.map((v, i) => Math.hypot(v[0] - path[(i + 1) % 160][0], v[1] - path[(i + 1) % 160][1]));
  const length = lengths.reduce((a, b) => a + b, 0), pulse = 1 + .02 * Math.sin(local * 3.1), dots: OrbDot[] = [];
  let segment = 0, accumulated = 0;
  for (let i = 0; i < 24; i++) {
    const target = i / 24 * length;
    while (segment < 159 && accumulated + lengths[segment] < target) accumulated += lengths[segment++];
    const a = path[segment], b = path[(segment + 1) % 160], part = (target - accumulated) / lengths[segment];
    dots.push({ x: 32 + (a[0] + (b[0] - a[0]) * part) * size * pulse, y: 32 + (a[1] + (b[1] - a[1]) * part) * size * pulse,
      z: 0, r: Math.max(.35, .021 * .395 * 1.35 * 1.45 * size), white: .1, a: 1 });
  }
  return finish(dots);
}
// Native ribbon presets: the same geometry drives editorial px64 and app px20.
export function composingOrbFrame(t: number, orbSize: 20 | 64 = 64): OrbFrame {
  const small = orbSize === 20;
  const ghostCount = small ? 8 : 38, lanes = small ? 10 : 12, segments = small ? 20 : 44;
  const radius = orbSize * .39, pt = project(0, .3, 1, orbSize / 2), dots: OrbDot[] = [];
  const radiusScale = Math.pow(orbSize / 300, .6), radiusMul = small ? 1.073 : .85;
  for (let i = 0; i < ghostCount; i++) {
    const y0 = 1 - 2 * (i + .5) / ghostCount, radial = Math.sqrt(1 - y0 * y0), angle = i * Math.PI * (3 - Math.sqrt(5));
    const [x, y, z] = pt(radial * Math.cos(angle) * radius, y0 * radius, radial * Math.sin(angle) * radius), depth = (z / radius + 1) / 2;
    dots.push({ x, y, z, r: .8 * radiusScale, white: .78, a: .1 + .22 * depth });
  }
  for (let lane = 0; lane < lanes; lane++) {
    const offset = (lane - (lanes - 1) / 2) * .075, edge = Math.abs(lane - (lanes - 1) / 2) / ((lanes - 1) / 2);
    for (let index = 0; index < segments; index++) {
      const angle = index / segments * tau;
      const wobble = .16 * Math.sin(angle * 3 - t * 1.7 + lane * .22) + .07 * Math.sin(angle * 5 + t * 1.1);
      const off = offset + wobble;
      const x0 = Math.cos(angle), y0 = Math.cos(.55) * Math.sin(angle) - Math.sin(.55) * off;
      const z0 = Math.sin(.55) * Math.sin(angle) + Math.cos(.55) * off;
      const length = Math.hypot(x0, y0, z0), [x, y, z] = pt(x0 / length * radius, y0 / length * radius, z0 / length * radius), depth = (z / radius + 1) / 2;
      dots.push({ x, y, z, r: (1.1 + 1.7 * depth) * radiusMul * (1 - .25 * edge) * radiusScale,
        white: .52 - .44 * depth + .18 * edge, a: .4 + .6 * depth });
    }
  }
  return finish(dots);
}

// Native Searching px20: a rotating lattice with a scanning meridian.
export function searchingOrbFrame(t: number): OrbFrame {
  const orbSize = 20, radius = orbSize * .41;
  const pt = project(t * .5, .4 + .06 * Math.sin(t * .35), radius, orbSize / 2);
  const scan = t * (.5 + 1.2 * 4.335), radiusScale = Math.pow(orbSize / 300, .6);
  const dots: OrbDot[] = [];
  // Resolved native count .105: six latitude intervals, density fourteen.
  for (let ring = 0; ring <= 6; ring++) {
    const latitude = -Math.PI / 2 + ring / 6 * Math.PI;
    const cosLat = Math.cos(latitude), sinLat = Math.sin(latitude);
    const count = Math.max(1, Math.round(Math.abs(cosLat) * 14));
    for (let index = 0; index < count; index++) {
      const longitude = index / count * tau;
      const [x, y, z] = pt(cosLat * Math.cos(longitude), sinLat, cosLat * Math.sin(longitude));
      const depth = (z + 1) / 2;
      const delta = Math.atan2(Math.sin(longitude + t * .5 - scan), Math.cos(longitude + t * .5 - scan));
      const boost = Math.exp(-delta * delta / .18) * Math.max(0, z);
      dots.push({ x, y, z, r: (1.05 + 2.975 * depth + boost) * radiusScale,
        white: .62 - .54 * depth, a: .45 + .55 * Math.min(1, boost) });
    }
  }
  return finish(dots);
}

export function editorialOrbFrame(state: EditorialOrbState, engineTime: number): OrbFrame {
  return { breathing, connecting, shaping, composing: composingOrbFrame }[state](engineTime);
}
