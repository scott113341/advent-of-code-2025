import { loadInput } from "../common/input.js";
import { isMain } from "../common/util.js";

// Diagram of the tachyon manifold. A tachyon beam enters the manifold at "S"
// and moves down. They pass through space (.). When hitting a splitter (^),
// the beam stops and is split to the immediate left and right.
const INPUT = loadInput(7);

const MANIFOLD_SPACE = ["S", ".", "^"] as const;
type ManifoldSpace = (typeof MANIFOLD_SPACE)[number];
type Manifold = Array<Array<ManifoldSpace>>;

function isManifoldSpace(c: string): c is ManifoldSpace {
  return (MANIFOLD_SPACE as readonly string[]).includes(c);
}

// How many times will the beam be split?
export function part1(input = INPUT) {
  const manifold = parseInput(input);
  const layersBeams: Set<number>[] = [];
  let splitCount = 0;

  for (const line of manifold) {
    const prevLayerBeamIdxs = layersBeams[layersBeams.length - 1];
    let layerBeams;

    if (line.includes("S")) {
      // Starting line; beams are just at the "S"
      layerBeams = new Set([line.indexOf("S")]);
    } else if (line.includes("^")) {
      // Split beams, starting with previous layer
      layerBeams = new Set(prevLayerBeamIdxs);

      // Get list of splitter idxs in this layer
      const splitterIdxs = line
        .map((s, idx) => (s === "^" ? idx : null))
        .filter((idx) => idx !== null);

      // Split at each splitter (if there's a beam there)
      for (const splitterIdx of splitterIdxs) {
        if (layerBeams.has(splitterIdx)) {
          layerBeams.delete(splitterIdx);
          layerBeams.add(splitterIdx - 1);
          layerBeams.add(splitterIdx + 1);
          splitCount++;
        }
      }
    } else {
      // Empty line; propagate beams as-is
      layerBeams = new Set(prevLayerBeamIdxs);
    }

    layersBeams.push(layerBeams);
  }

  return splitCount;
}

// It's a quantum tachyon manifold; time splits at the splitter and the light
// particle goes either left or right. How many possible timelines are there?
export function part2(input = INPUT) {
  // Go through each layer, recording the number of possible paths there are to
  // reach each given beam location.

  const manifold = parseInput(input);
  const layersBeams: Set<number>[] = [];
  const layersTimelines: Map<number, number>[] = [];

  for (const line of manifold) {
    const prevLayerBeams = layersBeams[layersBeams.length - 1];
    const prevLayerTimelines = layersTimelines[layersTimelines.length - 1];

    let layerBeams;
    let layerTimelines = new Map();

    if (line.includes("S")) {
      // Starting line; beams are just at the "S"
      layerBeams = new Set([line.indexOf("S")]);
      layerTimelines.set(line.indexOf("S"), 1);
    } else if (line.includes("^")) {
      // Split beams, starting with previous layer
      layerBeams = new Set(prevLayerBeams);

      // Get list of splitter idxs in this layer
      const splitterIdxs = line
        .map((s, idx) => (s === "^" ? idx : null))
        .filter((idx) => idx !== null);

      // Split at each splitter (if there's a beam there)
      for (const splitterIdx of splitterIdxs) {
        if (layerBeams.has(splitterIdx)) {
          layerBeams.delete(splitterIdx);
          layerBeams.add(splitterIdx - 1);
          layerBeams.add(splitterIdx + 1);
        }
      }

      // For each incoming beam idx and its timeline count
      for (const [idx, timelines] of prevLayerTimelines) {
        // If hitting a splitter, split; otherwise propagate as-is
        const beamIdxs = splitterIdxs.includes(idx)
          ? [idx - 1, idx + 1]
          : [idx];

        // Combine timeline counts with any coincident beams
        for (const beamIdx of beamIdxs) {
          if (layerTimelines.has(beamIdx)) {
            const current = layerTimelines.get(beamIdx);
            layerTimelines.set(beamIdx, current + timelines);
          } else {
            layerTimelines.set(beamIdx, timelines);
          }
        }
      }
    } else {
      // Empty line; propagate beams as-is
      layerBeams = new Set(prevLayerBeams);
      layerTimelines = new Map(prevLayerTimelines);
    }

    layersBeams.push(layerBeams);
    layersTimelines.push(layerTimelines);
  }

  const lastLayer = layersTimelines[layersTimelines.length - 1];

  return [...lastLayer.values()].reduce((tot, c) => tot + c);
}

export function parseInput(input: string): Manifold {
  return input.split("\n").map((l) => l.split("").filter(isManifoldSpace));
}

if (isMain(import.meta)) {
  console.log("Part 1: ", part1());
  console.log("Part 2: ", part2());
}
