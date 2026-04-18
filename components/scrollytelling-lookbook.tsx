"use client";

import { useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform
} from "framer-motion";

import { DecryptedText } from "@/components/decrypted-text";
import { LookbookScene } from "@/lib/site-data";

export function ScrollytellingLookbook({ scenes }: { scenes: LookbookScene[] }) {
  return (
    <div className="lookbook-root">
      <section className="lookbook-intro">
        <div className="lookbook-intro-grid">
          <div className="space-y-6">
            <p className="editorial-kicker">Lookbook / Narrative Film</p>
            <h1 className="lookbook-intro-heading">Scroll through scenes, not stacked images.</h1>
            <p className="lookbook-intro-copy">
              Archive Zero now moves like a campaign film: threshold, inspection, drift, and archive. The text
              decrypts into view, the frame opens with a cinematic shutter, and technical callouts trace the garment
              like a living schematic.
            </p>
          </div>

          <div className="lookbook-intro-panel">
            <div className="story-panel-header">
              <span>Motion Choreography</span>
              <span>{String(scenes.length).padStart(2, "0")} scenes</span>
            </div>
            <ul className="story-metrics">
              <li className="story-metric">
                <span />
                Extreme-slow parallax with layered depth
              </li>
              <li className="story-metric">
                <span />
                Expanding shutter reveals and scene-by-scene pacing
              </li>
              <li className="story-metric">
                <span />
                Drawn targeting lines and decrypted text choreography
              </li>
            </ul>
          </div>
        </div>
      </section>

      <div className="bleed-viewport">
        {scenes.map((scene, index) => (
          <NarrativeScene key={scene.id} index={index} scene={scene} total={scenes.length} />
        ))}
      </div>
    </div>
  );
}

function NarrativeScene({
  index,
  scene,
  total
}: {
  index: number;
  scene: LookbookScene;
  total: number;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const isInView = useInView(ref, { amount: 0.34, margin: "-12% 0px -12% 0px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 24,
    mass: 0.35
  });

  const mediaY = useTransform(progress, [0, 1], prefersReducedMotion ? [0, 0] : [-84, 84]);
  const mediaScale = useTransform(progress, [0, 0.55, 1], prefersReducedMotion ? [1.04, 1.04, 1.04] : [1.18, 1.08, 1.02]);
  const mediaOpacity = useTransform(progress, [0.02, 0.18, 0.92, 1], [0.4, 1, 1, 0.68]);
  const copyY = useTransform(progress, [0.1, 0.35, 0.88], prefersReducedMotion ? [0, 0, 0] : [86, 0, -22]);
  const copyOpacity = useTransform(progress, [0.08, 0.24, 0.88, 1], [0, 1, 1, 0.36]);
  const panelY = useTransform(progress, [0.18, 0.44, 0.9], prefersReducedMotion ? [0, 0, 0] : [56, 0, -16]);
  const panelOpacity = useTransform(progress, [0.15, 0.33, 0.9, 1], [0, 1, 1, 0.32]);
  const shutterScale = useTransform(progress, [0.02, 0.28], [1, 0]);
  const shutterOpacity = useTransform(progress, [0.02, 0.25], [1, 0]);
  const lineProgress = useTransform(progress, [0.3, 0.58], [0, 1]);
  const labelOpacity = useTransform(progress, [0.38, 0.56, 0.92, 1], [0, 1, 0.68, 0.25]);
  const orbitX = useTransform(progress, [0, 1], prefersReducedMotion ? [0, 0] : [-40, 60]);
  const orbitY = useTransform(progress, [0, 1], prefersReducedMotion ? [0, 0] : [20, -30]);
  const orbitOpacity = useTransform(progress, [0.18, 0.46, 0.86], [0, 0.45, 0.15]);

  return (
    <section ref={ref} className="narrative-scene">
      <div className="narrative-stage">
        <motion.div
          className="narrative-media"
          style={{
            backgroundImage: `url(${scene.image})`,
            opacity: mediaOpacity,
            scale: mediaScale,
            y: mediaY
          }}
        />
        <div className="narrative-overlay" />
        <motion.div className="narrative-orbit" style={{ opacity: orbitOpacity, x: orbitX, y: orbitY }} />

        <motion.div className="shutter-bar top" style={{ opacity: shutterOpacity, scaleY: shutterScale }} />
        <motion.div className="shutter-bar bottom" style={{ opacity: shutterOpacity, scaleY: shutterScale }} />

        <div className="story-callout-layer">
          <svg className="story-callout-svg" viewBox="0 0 1000 1000" preserveAspectRatio="none">
            {scene.callouts.map((callout) => (
              <g key={callout.label}>
                <motion.path
                  className="story-callout-path"
                  d={buildCalloutPath(callout)}
                  style={{ pathLength: lineProgress }}
                />
                <motion.circle
                  className="story-callout-node"
                  cx={callout.to.x * 10}
                  cy={callout.to.y * 10}
                  r="4.5"
                  style={{ opacity: labelOpacity, scale: labelOpacity }}
                />
              </g>
            ))}
          </svg>

          {scene.callouts.map((callout) => (
            <motion.div
              key={`${scene.id}-${callout.label}`}
              className={`callout-tag ${callout.align === "right" ? "is-right" : ""}`}
              style={{
                left: `${callout.from.x}%`,
                opacity: labelOpacity,
                top: `${callout.from.y}%`,
                y: panelY
              }}
            >
              {callout.label}
            </motion.div>
          ))}
        </div>

        <div className="narrative-grid">
          <motion.div className="story-copy" style={{ opacity: copyOpacity, y: copyY }}>
            <p className="story-index">
              {scene.chapter}
              <span>
                {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
            </p>
            <p className="editorial-kicker">{scene.eyebrow}</p>
            <h2 className="lookbook-display">
              <DecryptedText active={isInView} text={scene.title} />
            </h2>
            <p className="story-narrative">{scene.narrative}</p>
            <motion.div className="story-caption" style={{ opacity: panelOpacity, y: panelY }}>
              <span className="story-caption-label">Frame Note</span>
              <p>{scene.caption}</p>
            </motion.div>
          </motion.div>

          <motion.aside className="story-panel" style={{ opacity: panelOpacity, y: panelY }}>
            <div className="story-panel-header">
              <span>Atmosphere</span>
              <span>{scene.ambientLabel}</span>
            </div>
            <ul className="story-metrics">
              {scene.metrics.map((metric) => (
                <li key={metric} className="story-metric">
                  <span />
                  {metric}
                </li>
              ))}
            </ul>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}

function buildCalloutPath(callout: LookbookScene["callouts"][number]) {
  return `M ${callout.from.x * 10} ${callout.from.y * 10} Q ${callout.via.x * 10} ${callout.via.y * 10} ${callout.to.x * 10} ${callout.to.y * 10}`;
}
