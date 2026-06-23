"use client"

import { useCallback, useEffect, useRef, useState } from "react"

const GRID = 16
const SPEED = 110

type Point = { x: number; y: number }

const START: Point[] = [
  { x: 6, y: 8 },
  { x: 5, y: 8 },
  { x: 4, y: 8 },
]

function randomFood(snake: Point[]): Point {
  let p: Point
  do {
    p = { x: Math.floor(Math.random() * GRID), y: Math.floor(Math.random() * GRID) }
  } while (snake.some((s) => s.x === p.x && s.y === p.y))
  return p
}

export function SnakeGame() {
  const [snake, setSnake] = useState<Point[]>(START)
  const [food, setFood] = useState<Point>({ x: 12, y: 8 })
  const [dir, setDir] = useState<Point>({ x: 1, y: 0 })
  const [running, setRunning] = useState(false)
  const [over, setOver] = useState(false)
  const [score, setScore] = useState(0)
  const [best, setBest] = useState(0)

  const dirRef = useRef(dir)
  const queuedRef = useRef<Point | null>(null)
  dirRef.current = dir

  const reset = useCallback(() => {
    setSnake(START)
    setFood(randomFood(START))
    setDir({ x: 1, y: 0 })
    dirRef.current = { x: 1, y: 0 }
    queuedRef.current = null
    setScore(0)
    setOver(false)
    setRunning(true)
  }, [])

  const turn = useCallback((nd: Point) => {
    const cur = queuedRef.current ?? dirRef.current
    if (cur.x + nd.x === 0 && cur.y + nd.y === 0) return // no reverse
    queuedRef.current = nd
  }, [])

  // Keyboard controls
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const map: Record<string, Point> = {
        ArrowUp: { x: 0, y: -1 },
        ArrowDown: { x: 0, y: 1 },
        ArrowLeft: { x: -1, y: 0 },
        ArrowRight: { x: 1, y: 0 },
        w: { x: 0, y: -1 },
        s: { x: 0, y: 1 },
        a: { x: -1, y: 0 },
        d: { x: 1, y: 0 },
      }
      const nd = map[e.key]
      if (nd) {
        e.preventDefault()
        if (!running && !over) setRunning(true)
        turn(nd)
      }
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault()
        if (over) reset()
        else setRunning((r) => !r)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [running, over, turn, reset])

  // Game loop
  useEffect(() => {
    if (!running) return
    const id = setInterval(() => {
      setSnake((prev) => {
        const nextDir = queuedRef.current ?? dirRef.current
        queuedRef.current = null
        setDir(nextDir)
        const head = {
          x: prev[0].x + nextDir.x,
          y: prev[0].y + nextDir.y,
        }
        // wall or self collision
        if (
          head.x < 0 ||
          head.y < 0 ||
          head.x >= GRID ||
          head.y >= GRID ||
          prev.some((s) => s.x === head.x && s.y === head.y)
        ) {
          setOver(true)
          setRunning(false)
          setBest((b) => Math.max(b, prev.length - START.length))
          return prev
        }
        const ate = head.x === food.x && head.y === food.y
        const newSnake = [head, ...prev]
        if (ate) {
          setScore((s) => s + 1)
          setFood(randomFood(newSnake))
        } else {
          newSnake.pop()
        }
        return newSnake
      })
    }, SPEED)
    return () => clearInterval(id)
  }, [running, food])

  const cells = []
  for (let y = 0; y < GRID; y++) {
    for (let x = 0; x < GRID; x++) {
      const isHead = snake[0].x === x && snake[0].y === y
      const isBody = !isHead && snake.some((s) => s.x === x && s.y === y)
      const isFood = food.x === x && food.y === y
      cells.push(
        <div
          key={`${x}-${y}`}
          className={
            isHead
              ? "bg-foreground"
              : isBody
                ? "bg-foreground/70"
                : isFood
                  ? "bg-foreground/30 border border-foreground"
                  : "bg-transparent"
          }
        />,
      )
    }
  }

  return (
    <div className="border-2 border-foreground bg-background p-4 shadow-hard">
      <div className="mb-3 flex items-center justify-between border-b border-dashed border-foreground/40 pb-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        <span>snake.exe — cortesía de espera</span>
        <span>
          pts {score} · best {best}
        </span>
      </div>

      <div className="relative">
        <div
          className="grid aspect-square w-full gap-px bg-foreground/5"
          style={{
            gridTemplateColumns: `repeat(${GRID}, minmax(0, 1fr))`,
            backgroundImage:
              "linear-gradient(to right, color-mix(in oklch, var(--foreground) 6%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklch, var(--foreground) 6%, transparent) 1px, transparent 1px)",
            backgroundSize: `calc(100%/${GRID}) calc(100%/${GRID})`,
          }}
        >
          {cells}
        </div>

        {(!running || over) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-background/85 text-center">
            <p className="font-mono text-sm font-bold uppercase tracking-widest">
              {over ? "game over" : "snake"}
            </p>
            {over && (
              <p className="font-mono text-xs text-muted-foreground">
                comiste {score} {score === 1 ? "manzana" : "manzanas"}
              </p>
            )}
            <button
              type="button"
              onClick={() => (over ? reset() : setRunning(true))}
              className="border-2 border-foreground bg-foreground px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-widest text-background transition-transform hover:-translate-y-0.5"
            >
              {over ? "reintentar" : "jugar"}
            </button>
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              flechas / wasd · espacio = pausa
            </p>
          </div>
        )}
      </div>

      {/* Mobile D-pad */}
      <div className="mt-4 grid grid-cols-3 gap-2 sm:hidden">
        <span />
        <DPadButton label="↑" onPress={() => turn({ x: 0, y: -1 })} />
        <span />
        <DPadButton label="←" onPress={() => turn({ x: -1, y: 0 })} />
        <DPadButton label="↓" onPress={() => turn({ x: 0, y: 1 })} />
        <DPadButton label="→" onPress={() => turn({ x: 1, y: 0 })} />
      </div>
    </div>
  )
}

function DPadButton({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <button
      type="button"
      onClick={onPress}
      className="border-2 border-foreground bg-background py-2 font-mono text-lg active:bg-foreground active:text-background"
      aria-label={`mover ${label}`}
    >
      {label}
    </button>
  )
}
