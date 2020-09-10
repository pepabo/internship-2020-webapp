import { useState, ChangeEvent } from 'react'

export const useInput = (v: string) => {
  const [value, set] = useState(v)
  return { value, set, onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => set(e.target.value) }
}
