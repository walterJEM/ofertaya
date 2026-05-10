import { useState, useEffect } from 'react'

export function useCountdown(initialSeconds = 8 * 3600 + 32 * 60 + 47) {
  const [seconds, setSeconds] = useState(initialSeconds)

  useEffect(() => {
    const id = setInterval(() => {
      setSeconds(s => (s > 0 ? s - 1 : 0))
    }, 1000)
    return () => clearInterval(id)
  }, [])

  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60

  const pad = n => String(n).padStart(2, '0')

  return { h: pad(h), m: pad(m), s: pad(s) }
}
