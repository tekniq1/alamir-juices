import { motion, useScroll, useTransform } from "motion/react";

const FRUITS = ["🍊", "🍓", "🍋", "🥝", "🍉", "🫐", "🥭", "🍒", "🍏", "🍍"];

const seeds = Array.from({ length: 14 }, (_, i) => ({
  emoji: FRUITS[i % FRUITS.length],
  left: (i * 37 + 11) % 100,
  top: (i * 53 + 7) % 100,
  size: 22 + ((i * 7) % 26),
  speed: 0.4 + ((i * 13) % 10) / 10,
  rotate: (i * 47) % 360,
}));

/** Floating fruit slices that drift with scroll — pure decoration. */
export function FruitParticles() {
  const { scrollY } = useScroll();
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {seeds.map((s, i) => (
        <Particle key={i} {...s} scrollY={scrollY} />
      ))}
    </div>
  );
}

function Particle({ emoji, left, top, size, speed, rotate, scrollY }: (typeof seeds)[number] & { scrollY: ReturnType<typeof useScroll>["scrollY"] }) {
  const y = useTransform(scrollY, [0, 3000], [0, -600 * speed]);
  const r = useTransform(scrollY, [0, 3000], [rotate, rotate + 240 * speed]);
  return (
    <motion.span
      style={{ left: `${left}%`, top: `${top}%`, fontSize: size, y, rotate: r }}
      className="absolute opacity-20 blur-[0.5px] select-none animate-float"
    >
      {emoji}
    </motion.span>
  );
}
