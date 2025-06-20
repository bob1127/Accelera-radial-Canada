"use client";
import { cn } from "@/lib/utils";
import {
  Environment,
  Lightformer,
  OrbitControls,
  useGLTF,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import { createNoise3D } from "simplex-noise";
import * as THREE from "three";

export const WavyBackground = ({
  children,
  className,
  containerClassName,
  colors,
  waveWidth,
  backgroundFill,
  blur = 10,
  speed = "fast",
  waveOpacity = 0.5,
  ...props
}: {
  children?: any;
  className?: string;
  containerClassName?: string;
  colors?: string[];
  waveWidth?: number;
  backgroundFill?: string;
  blur?: number;
  speed?: "slow" | "fast";
  waveOpacity?: number;
  [key: string]: any;
}) => {
  const noise = createNoise3D();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  let w: number, h: number, nt: number, i: number, x: number, ctx: any;

  const getSpeed = () => (speed === "fast" ? 0.002 : 0.001);

  const init = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    ctx = canvas.getContext("2d");
    w = ctx.canvas.width = window.innerWidth;
    h = ctx.canvas.height = window.innerHeight;
    ctx.filter = `blur(${blur}px)`;
    nt = 0;

    window.onresize = () => {
      w = ctx.canvas.width = window.innerWidth;
      h = ctx.canvas.height = window.innerHeight;
      ctx.filter = `blur(${blur}px)`;
    };

    render();
  };

  const waveColors = colors ?? [
    "#38bdf8",
    "#818cf8",
    "#c084fc",
    "#e879f9",
    "#22d3ee",
  ];

  const drawWave = (n: number) => {
    nt += getSpeed();
    for (i = 0; i < n; i++) {
      ctx.beginPath();
      ctx.lineWidth = waveWidth || 50;
      ctx.strokeStyle = waveColors[i % waveColors.length];
      for (x = 0; x < w; x += 5) {
        const y = noise(x / 800, 0.3 * i, nt) * 100;
        ctx.lineTo(x, y + h * 0.5);
      }
      ctx.stroke();
      ctx.closePath();
    }
  };

  let animationId: number;
  const render = () => {
    ctx.globalAlpha = 1;
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = backgroundFill || "#000000";
    ctx.fillRect(0, 0, w, h);
    ctx.globalAlpha = waveOpacity;
    drawWave(5);
    animationId = requestAnimationFrame(render);
  };

  useEffect(() => {
    init();
    return () => cancelAnimationFrame(animationId);
  }, []);

  const [isSafari, setIsSafari] = useState(false);
  useEffect(() => {
    setIsSafari(
      typeof window !== "undefined" &&
        navigator.userAgent.includes("Safari") &&
        !navigator.userAgent.includes("Chrome")
    );
  }, []);

  return (
    <div
      className={cn(
        "h-screen flex flex-col items-center justify-center bg-black overflow-hidden",
        containerClassName
      )}
    >
      {/* ✅ 背景遮罩：避免 blur 波紋邊緣暈光 */}
      <div className="absolute inset-0 bg-black z-[-1]" />

      <canvas
        className="absolute inset-0 z-0 border-none outline-none bg-transparent"
        ref={canvasRef}
        id="canvas"
        style={{
          ...(isSafari ? { filter: `blur(${blur}px)` } : {}),
          background: "transparent",
        }}
      />

      <div className={cn("relative z-10 w-full h-full", className)} {...props}>
        <Canvas
          camera={{ position: [0, 0, 4.5], fov: 50 }}
          gl={{ alpha: true }}
          style={{ background: "transparent" }}
        >
          <ambientLight intensity={0.7} />
          <hemisphereLight
            color={new THREE.Color(0xffffff)}
            groundColor={new THREE.Color(0x444444)}
            intensity={0.8}
          />
          <spotLight
            position={[2, 5, 5]}
            angle={0.3}
            penumbra={1}
            intensity={3}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          <directionalLight
            position={[0, 2, 5]}
            intensity={2}
            color={0xffffff}
          />

          <Suspense fallback={null}>
            <TireModel />

            <Environment>
              <Lightformer
                intensity={6}
                position={[0, 5, -5]}
                scale={[10, 5, 1]}
                color="white"
                form="rect"
              />
            </Environment>
          </Suspense>

          <OrbitControls enableZoom={false} />
        </Canvas>

        {children}
      </div>
    </div>
  );
};

function TireModel() {
  const { scene } = useGLTF("/3d/tire01.glb", true);
  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const name = mesh.name.toLowerCase();

        if (name === "plane") {
          mesh.material = new THREE.MeshStandardMaterial({
            color: new THREE.Color(0x1a1a1a),
            roughness: 0.95,
            metalness: 0.05,
          });
        }

        if (name === "rim") {
          mesh.material = new THREE.MeshStandardMaterial({
            color: new THREE.Color(0xb0b0b0),
            roughness: 0.2,
            metalness: 1,
            envMapIntensity: 1.5,
          });
        }
      }
    });
  }, [scene]);

  return (
    <primitive
      object={scene}
      scale={0.2}
      position={[0, -0.3, 0]}
      rotation={[0, Math.PI, 0]} // 正面朝向鏡頭
    />
  );
}
