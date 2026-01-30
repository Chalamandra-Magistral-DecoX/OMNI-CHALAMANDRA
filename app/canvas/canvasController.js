/**
 * CANVAS CONTROLLER — OMNI-CHALAMANDRA
 * Handles image input, point selection, SRAP extraction,
 * visual guidance, and payload dispatch to the OMNI Orchestrator.
 */

import { drawColinearityGuide, drawDeviationWarning } from "./colinearityGuide.js";
import { computeCrossRatio, isColinear } from "./crossRatio.js";
import { orchestrateOMNI } from "../agents/orchestrator.js";

export class CanvasController {
  constructor(canvasElement, imageInputElement) {
    this.canvas = canvasElement;
    this.ctx = this.canvas.getContext("2d");

    this.imageInput = imageInputElement;

    this.image = new Image();
    this.points = [];
    this.maxPoints = 4;

    this.mandalaSeed = Math.random().toString(36).slice(2);

    this._bindEvents();
  }

  /* ----------------------------------------
     EVENT BINDING
  ---------------------------------------- */
  _bindEvents() {
    this.imageInput.addEventListener("change", (e) =>
      this._handleImageUpload(e)
    );

    this.canvas.addEventListener("click", (e) =>
      this._handleCanvasClick(e)
    );
  }

  /* ----------------------------------------
     IMAGE LOADING
  ---------------------------------------- */
  _handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      this.image.onload = () => this._render();
      this.image.src = reader.result;
    };

    reader.readAsDataURL(file);
  }

  /* ----------------------------------------
     POINT SELECTION
  ---------------------------------------- */
  _handleCanvasClick(event) {
    if (this.points.length >= this.maxPoints) return;

    const rect = this.canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    this.points.push({ x, y });

    this._render();

    if (this.points.length === this.maxPoints) {
      this._processSRAP();
    }
  }

  /* ----------------------------------------
     RENDER LOOP
  ---------------------------------------- */
  _render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (this.image.src) {
      this.ctx.drawImage(
        this.image,
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );
    }

    this._drawPoints();

    if (this.points.length >= 2) {
      drawColinearityGuide(this.ctx, this.points);
    }

    if (this.points.length >= 3) {
      const baseLine = {
        start: this.points[0],
        end: this.points[this.points.length - 1]
      };

      this.points.slice(1, -1).forEach((p) =>
        drawDeviationWarning(this.ctx, baseLine, p)
      );
    }
  }

  _drawPoints() {
    this.points.forEach((p, index) => {
      this.ctx.save();

      this.ctx.fillStyle = index === 0 || index === 3
        ? "cyan"
        : "white";

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
      this.ctx.fill();

      this.ctx.restore();
    });
  }

  /* ----------------------------------------
     SRAP → DECOX PIPELINE
  ---------------------------------------- */
  async _processSRAP() {
    console.log(">> SRAP: Extracting geometric invariant...");

    if (!isColinear(this.points)) {
      console.warn(">> SRAP WARNING: Points are not colinear.");
      return;
    }

    const crossRatio = computeCrossRatio(this.points);

    const payload = {
      crossRatio,
      mandalaSeed: this.mandalaSeed,
      imageMeta: {
        width: this.image.width,
        height: this.image.height
      },
      srapCoordinates: this.points.map((p) => ({
        x: p.x / this.canvas.width,
        y: p.y / this.canvas.height
      }))
    };

    console.log(">> PAYLOAD TO OMNI:", payload);

    const result = await orchestrateOMNI(payload);

    this._dispatchResult(result);
  }

  /* ----------------------------------------
     OUTPUT DISPATCH
  ---------------------------------------- */
  _dispatchResult(result) {
    if (result?.error) {
      console.error(">> OMNI RESPONSE ERROR:", result.message);
      return;
    }

    // Broadcast result for mandala, sound, export modules
    window.dispatchEvent(
      new CustomEvent("OMNI_RESULT_READY", {
        detail: result
      })
    );
  }

  /* ----------------------------------------
     RESET
  ---------------------------------------- */
  reset() {
    this.points = [];
    this.mandalaSeed = Math.random().toString(36).slice(2);
    this._render();
  }
}
