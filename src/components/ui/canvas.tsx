class Oscillator {
  phase: number;
  offset: number;
  frequency: number;
  amplitude: number;
  valueVal: number;

  constructor(
    options: { phase?: number; offset?: number; frequency?: number; amplitude?: number } = {},
  ) {
    this.phase = options.phase || 0;
    this.offset = options.offset || 0;
    this.frequency = options.frequency || 0.001;
    this.amplitude = options.amplitude || 1;
    this.valueVal = 0;
  }

  update() {
    this.phase += this.frequency;
    this.valueVal = this.offset + Math.sin(this.phase) * this.amplitude;
    return this.valueVal;
  }

  value() {
    return this.valueVal;
  }
}

class NodeItem {
  x: number = 0;
  y: number = 0;
  vx: number = 0;
  vy: number = 0;
}

class LineItem {
  spring: number;
  friction: number;
  nodes: NodeItem[];

  constructor(options: { spring: number }) {
    this.spring = options.spring + 0.1 * Math.random() - 0.05;
    this.friction = E.friction + 0.01 * Math.random() - 0.005;
    this.nodes = [];
    for (let i = 0; i < E.size; i++) {
      const node = new NodeItem();
      node.x = pos.x;
      node.y = pos.y;
      this.nodes.push(node);
    }
  }

  update() {
    let springValue = this.spring;
    const firstNode = this.nodes[0];
    if (firstNode) {
      firstNode.vx += (pos.x - firstNode.x) * springValue;
      firstNode.vy += (pos.y - firstNode.y) * springValue;
    }

    for (let i = 0; i < this.nodes.length; i++) {
      const node = this.nodes[i];
      if (i > 0) {
        const prevNode = this.nodes[i - 1];
        if (prevNode) {
          node.vx += (prevNode.x - node.x) * springValue;
          node.vy += (prevNode.y - node.y) * springValue;
          node.vx += prevNode.vx * E.dampening;
          node.vy += prevNode.vy * E.dampening;
        }
      }
      node.vx *= this.friction;
      node.vy *= this.friction;
      node.x += node.vx;
      node.y += node.vy;
      springValue *= E.tension;
    }
  }

  draw(context: CanvasRenderingContext2D) {
    const firstNode = this.nodes[0];
    if (!firstNode) return;
    let nX = firstNode.x;
    let nY = firstNode.y;
    context.beginPath();
    context.moveTo(nX, nY);

    let a = 1;
    for (a = 1; a < this.nodes.length - 2; a++) {
      const currentNode = this.nodes[a];
      const nextNode = this.nodes[a + 1];
      if (currentNode && nextNode) {
        nX = 0.5 * (currentNode.x + nextNode.x);
        nY = 0.5 * (currentNode.y + nextNode.y);
        context.quadraticCurveTo(currentNode.x, currentNode.y, nX, nY);
      }
    }

    const penNode = this.nodes[a];
    const lastNode = this.nodes[a + 1];
    if (penNode && lastNode) {
      context.quadraticCurveTo(penNode.x, penNode.y, lastNode.x, lastNode.y);
    }
    context.stroke();
    context.closePath();
  }
}

interface CanvasConfig {
  debug: boolean;
  friction: number;
  trails: number;
  size: number;
  dampening: number;
  tension: number;
}

let ctx:
  | (CanvasRenderingContext2D & {
      running?: boolean;
      frame?: number;
      canvasElement?: HTMLCanvasElement;
    })
  | null = null;
let f: Oscillator;
const pos = { x: 0, y: 0 };
let lines: LineItem[] = [];

const E: CanvasConfig = {
  debug: true,
  friction: 0.5,
  trails: 80,
  size: 50,
  dampening: 0.025,
  tension: 0.99,
};

function onMousemove(e: MouseEvent | TouchEvent) {
  function o() {
    lines = [];
    for (let i = 0; i < E.trails; i++) {
      lines.push(new LineItem({ spring: 0.45 + (i / E.trails) * 0.025 }));
    }
  }

  document.removeEventListener("mousemove", onMousemove);
  document.removeEventListener("touchstart", onMousemove);

  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("touchmove", handleMouseMove);
  document.addEventListener("touchstart", handleTouchStart);

  handleMouseMove(e);
  o();
  render();
}

function handleMouseMove(e: MouseEvent | TouchEvent) {
  if ("touches" in e) {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      if (touch) {
        const rect = ctx?.canvasElement?.getBoundingClientRect();
        pos.x = touch.clientX - (rect ? rect.left : 0);
        pos.y = touch.clientY - (rect ? rect.top : 0);
      }
    }
  } else {
    const rect = ctx?.canvasElement?.getBoundingClientRect();
    pos.x = e.clientX - (rect ? rect.left : 0);
    pos.y = e.clientY - (rect ? rect.top : 0);
  }
}

function handleTouchStart(e: TouchEvent) {
  if (e.touches.length === 1) {
    const touch = e.touches[0];
    if (touch) {
      const rect = ctx?.canvasElement?.getBoundingClientRect();
      pos.x = touch.clientX - (rect ? rect.left : 0);
      pos.y = touch.clientY - (rect ? rect.top : 0);
    }
  }
}

function render() {
  if (ctx && ctx.running) {
    ctx.globalCompositeOperation = "source-over";
    ctx.clearRect(
      0,
      0,
      ctx.canvasElement?.width || window.innerWidth,
      ctx.canvasElement?.height || window.innerHeight,
    );
    ctx.globalCompositeOperation = "lighter";

    ctx.strokeStyle = "hsla(" + Math.round(f.update()) + ",100%,50%,0.025)";
    ctx.lineWidth = 10;

    for (let t = 0; t < E.trails; t++) {
      const line = lines[t];
      if (line) {
        line.update();
        line.draw(ctx);
      }
    }

    if (ctx.frame !== undefined) ctx.frame++;
    window.requestAnimationFrame(render);
  }
}

function resizeCanvas() {
  if (ctx && ctx.canvasElement) {
    const parent = ctx.canvasElement.parentElement;
    ctx.canvasElement.width = parent ? parent.clientWidth : window.innerWidth;
    ctx.canvasElement.height = parent ? parent.clientHeight : window.innerHeight;
  }
}

export const renderCanvas = function () {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  if (!canvas) return;

  const context = canvas.getContext("2d");
  if (!context) return;

  ctx = context as any;
  if (ctx) {
    ctx.running = true;
    ctx.frame = 1;
    ctx.canvasElement = canvas;
  }

  f = new Oscillator({
    phase: Math.random() * 2 * Math.PI,
    amplitude: 85,
    frequency: 0.0015,
    offset: 285,
  });

  // Initialize mouse position to center
  pos.x = window.innerWidth / 2;
  pos.y = window.innerHeight / 2;

  document.addEventListener("mousemove", onMousemove);
  document.addEventListener("touchstart", onMousemove);
  document.body.addEventListener("orientationchange", resizeCanvas);
  window.addEventListener("resize", resizeCanvas);

  const handleFocus = () => {
    if (ctx && !ctx.running) {
      ctx.running = true;
      render();
    }
  };

  const handleBlur = () => {
    if (ctx) {
      ctx.running = true;
    }
  };

  window.addEventListener("focus", handleFocus);
  window.addEventListener("blur", handleBlur);

  resizeCanvas();
};

export const cleanUpCanvas = function () {
  if (ctx) {
    ctx.running = false;
  }
  document.removeEventListener("mousemove", onMousemove);
  document.removeEventListener("touchstart", onMousemove);
  document.removeEventListener("mousemove", handleMouseMove);
  document.removeEventListener("touchmove", handleMouseMove);
  document.removeEventListener("touchstart", handleTouchStart);
  document.body.removeEventListener("orientationchange", resizeCanvas);
  window.removeEventListener("resize", resizeCanvas);
  ctx = null;
  lines = [];
};
