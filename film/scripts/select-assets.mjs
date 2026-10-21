import fs from "node:fs/promises";
import path from "node:path";
import ts from "typescript";
import assert from "node:assert/strict";
import { pathToFileURL } from "node:url";
import crypto from "node:crypto";
const root = process.cwd(),
  dir = path.join(root, "out/asset-selection");
const sources = [];
for (const folder of ["native-demo", "v62", "v63"])
  for (const name of await fs.readdir(path.join(root, "src", folder)))
    if (name.endsWith(".ts")) sources.push("src/" + folder + "/" + name);
for (const source of sources) {
  if (!source.endsWith(".ts")) continue;
  const rel = source.replace("src/", "").replace(/\.ts$/, ".mjs"),
    to = path.join(dir, rel);
  await fs.mkdir(path.dirname(to), { recursive: true });
  let js = ts
    .transpileModule(await fs.readFile(source, "utf8"), {
      compilerOptions: { module: ts.ModuleKind.ESNext },
    })
    .outputText.replace(/from ["'](\.[^"']+)["']/g, "from '$1.mjs'");
  await fs.writeFile(to, js);
}
const load = async (p) => import(pathToFileURL(path.join(dir, p + ".mjs")));
const [
  { nativeAt, reopenedAt },
  { filmTime, durationInFrames },
  { complete, decisions: d, frameAt },
  { tracks },
  { nativeAt: shortAt },
  { short },
] = await Promise.all([
  load("native-demo/nativeEdit"),
  load("native-demo/playback"),
  load("native-demo/direction"),
  load("native-demo/take"),
  load("v62/nativeEdit"),
  load("v62/direction"),
]);
const selected = new Set([
  "brand-symbol.svg",
  "native-demo/audio/complete.wav",
  "native-demo/audio/complete.json",
  "v62/audio/short.wav",
  "v62/audio/short.json",
]);
for (let f = 0; f < durationInFrames; f++) {
  const t = filmTime(f / 60);
  if (t >= complete.window && t < complete.hide) selected.add(nativeAt(t));
  if (t >= complete.retrieve && t < d.reopen + 0.32) {
    const seconds =
      t < d.search
        ? 0.1 + t - complete.retrieve
        : Math.min(4.4, 1.55 + t - d.search);
    selected.add("native-demo/" + frameAt(tracks.home3, seconds));
  }
  if (t >= d.reopen && t < complete.closing + 1.56) selected.add(reopenedAt(t));
}
for (let f = 0; f < 600; f++) {
  const t = f / 60;
  if (t >= short.window && t < short.hide) selected.add(shortAt(t, "short"));
}
const assets = [];
for (const file of [...selected].sort()) {
  const data = await fs.readFile(path.join(root, "public", file));
  assets.push({
    path: file,
    bytes: data.length,
    sha256: crypto.createHash("sha256").update(data).digest("hex"),
  });
}
const result = {
  compositions: ["Rasc-Native-Demo-Complete", "Rasc-Short"],
  source:
    "Exact native image/audio bytes selected by the approved 60 fps timelines; no image conversion",
  assets,
};
if (process.argv.includes("--write")) {
  await fs.writeFile(
    "assets-manifest.json",
    JSON.stringify(result, null, 2) + "\n",
  );
  await fs.writeFile(
    "out/selected-paths.txt",
    assets.map((a) => "film/public/" + a.path).join("\n") + "\n",
  );
} else {
  const expected = JSON.parse(
    await fs.readFile("assets-manifest.json", "utf8"),
  );
  assert.deepEqual(
    result,
    expected,
    "Timeline asset coverage changed; regenerate and review the selected assets.",
  );
}
const unique = new Map(assets.map((a) => [a.sha256, a.bytes]));
console.log({
  assets: assets.length,
  bytes: assets.reduce((a, b) => a + b.bytes, 0),
  unique: unique.size,
  uniqueBytes: [...unique.values()].reduce((a, b) => a + b, 0),
});
