import { orchestrateOMNI } from "./core/orchestrator.js";
import { exportJSON } from "./utils/exporter.js";
import { computeCrossRatio } from "./utils/geometry.js";

const canvas = document.getElementById("canvasMain");
const ctx = canvas.getContext("2d");
const imgInput = document.getElementById("imageInput");
const btn = document.getElementById("btnProject");
const output = document.getElementById("output");
const exportBtn = document.getElementById("btnExport");

let img = new Image();
let points = [];

imgInput.onchange = (e) => {
  const file = e.target.files[0];
  img.src = URL.createObjectURL(file);
};

img.onload = () => {
  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0);
};

canvas.onclick = (e) => {
  if (points.length >= 4) return;

  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  points.push([x, y]);

  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.arc(x, y, 4, 0, Math.PI * 2);
  ctx.fill();

  document.getElementById("nodes-active").innerText = points.length;
};

btn.onclick = async () => {
  if (points.length < 4) {
    alert("Select 4 colinear points.");
    return;
  }

  const R = computeCrossRatio(points);

  const result = await orchestrateOMNI({
    crossRatio: R,
    mandalaSeed: Date.now(),
    points
  });

  output.textContent = JSON.stringify(result, null, 2);
};

exportBtn.onclick = () => {
  exportJSON(output.textContent);
};
