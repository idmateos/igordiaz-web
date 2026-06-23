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
  const [running, setRunning] = useState(false)
  const [over, setOver] = useState(false)
  const [score, setScore] = useState(0)
  const [best, setBest] = useState(0)

  // Refs keep the game loop stable so it never captures stale values.
  const snakeRef = useRef<Point[]>(START)
  const foodRef = useRef<Point>(food)
  const dirRef = useRef<Point>({ x: 1, y: 0 })
  const queuedRef = useRef<Point | null>(null)
  const runningRef = useRef(false)
  const overRef = useRef(false)

  const reset = useCallback(() => {
    const fresh = START.slice()
    snakeRef.current = fresh
    foodRef.current = randomFood(fresh)
    dirRef.current = { x: 1, y: 0 }
    queuedRef.current = null
    overRef.current = false
    runningRef.current = true
    setSnake(fresh)
    setFood(foodRef.current)
    setScore(0)
    setOver(false)
    setRunning(true)
  }, [])

  const start = useCallback(() => {
    if (overRef.current) {
      reset()
      return
    }
    runningRef.current = true
    setRunning(true)
  }, [reset])

  const pauseToggle = useCallback(() => {
    if (overRef.current) {
      reset()
      return
    }
    runningRef.current = !runningRef.current
    setRunning(runningRef.current)
  }, [reset])

  const turn = useCallback((nd: Point) => {
    const cur = queuedRef.current ?? dirRef.current
    // prevent reversing directly onto itself
    if (cur.x + nd.x === 0 && cur.y + nd.y === 0) return
    queuedRef.current = nd
    if (!runningRef.current && !overRef.current) {
      runningRef.current = true
      setRunning(true)
    }
  }, [])

  // Keyboard controls (stable listener using refs)
  useEffect(() => {
    const map: Record<string, Point> = {
      ArrowUp: { x: 0, y: -1 },
      ArrowDown: { x: 0, y: 1 },
      ArrowLeft: { x: -1, y: 0 },
      ArrowRight: { x: 1, y: 0 },
      w: { x: 0, y: -1 },
      s: { x: 0, y: 1 },
      a: { x: -1, y: 0 },
      d: { x: 1, y: 0 },
      W: { x: 0, y: -1 },
      S: { x: 0, y: 1 },
      A: { x: -1, y: 0 },
      D: { x: 1, y: 0 },
    }
    const onKey = (e: KeyboardEvent) => {
      const nd = map[e.key]
      if (nd) {
        e.preventDefault()
        turn(nd)
        return
      }
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault()
        pauseToggle()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [turn, pauseToggle])

  // Single stable game loop
  useEffect(() => {
    const id = setInterval(() => {
      if (!runningRef.current || overRef.current) return

      const nextDir = queuedRef.current ?? dirRef.current
      queuedRef.current = null
      dirRef.current = nextDir

      const prev = snakeRef.current
      const head = { x: prev[0].x + nextDir.x, y: prev[0].y + nextDir.y }

      const hitWall = head.x < 0 || head.y < 0 || head.x >= GRID || head.y >= GRID
      const hitSelf = prev.some((s) => s.x === head.x && s.y === head.y)
      if (hitWall || hitSelf) {
        overRef.current = true
        runningRef.current = false
        setOver(true)
        setRunning(false)
        setBest((b) => Math.max(b, prev.length - START.length))
        return
      }

      const ate = head.x === foodRef.current.x && head.y === foodRef.current.y
      const next = [head, ...prev]
      if (ate) {
        foodRef.current = randomFood(next)
        setFood(foodRef.current)
        setScore((s) => s + 1)
      } else {
        next.pop()
      }
      snakeRef.current = next
      setSnake(next)
    }, SPEED)
    return () => clearInterval(id)
  }, [])

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
              onClick={start}
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
      <div className="mx-auto mt-4 grid max-w-[180px] grid-cols-3 gap-2 sm:hidden">
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
