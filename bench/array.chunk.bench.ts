import { bench, describe } from 'vitest'

function chunkWhile<T>(array: T[], size: number): T[][] {
  const groups = []
  let i = 0
  while (i < array.length) {
    // biome-ignore lint/suspicious/noAssignInExpressions: vitest-bench
    groups.push(array.slice(i, (i += size)))
  }
  return groups
}

function chunkPreAlloc<T>(array: T[], size: number): T[][] {
  if (size <= 0) throw new Error('Chunk size must be greater than 0')
  if (array.length === 0) return []
  if (size >= array.length) return [array.slice()]

  const chunksCount = Math.ceil(array.length / size)
  const result = new Array(chunksCount)

  for (let i = 0; i < chunksCount; i++) {
    const start = i * size
    const end = start + size
    if (end >= array.length) {
      result[i] = array.slice(start)
    } else {
      result[i] = array.slice(start, end)
    }
  }

  return result
}

describe('Array chunking with small arrays (n=100)', () => {
  const array = Array.from({ length: 100 }, (_, i) => i)

  bench('while', () => {
    chunkWhile(array, 10)
  })

  bench('pre-allocate (current)', () => {
    chunkPreAlloc(array, 10)
  })
})

describe('Array chunking with medium arrays (n=1000)', () => {
  const array = Array.from({ length: 1000 }, (_, i) => i)

  bench('while', () => {
    chunkWhile(array, 10)
  })

  bench('pre-allocate (current)', () => {
    chunkPreAlloc(array, 10)
  })
})

describe('Array chunking with large arrays (n=10000, size=20)', () => {
  const array = Array.from({ length: 10000 }, (_, i) => i)

  bench('while', () => {
    chunkWhile(array, 20)
  })

  bench('pre-allocate (current)', () => {
    chunkPreAlloc(array, 20)
  })
})

describe('Array chunking with large arrays (n=10000, size=500)', () => {
  const array = Array.from({ length: 10000 }, (_, i) => i)

  bench('while', () => {
    chunkWhile(array, 500)
  })

  bench('pre-allocate (current)', () => {
    chunkPreAlloc(array, 500)
  })
})