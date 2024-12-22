import { bench, describe } from 'vitest'

function chunkArrayFrom<T>(array: T[], size: number): T[][] {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, i) => array.slice(i * size, i * size + size))
}

function chunkWhile<T>(array: T[], size: number): T[][] {
  const groups = []
  let i = 0
  while (i < array.length) {
    // biome-ignore lint/suspicious/noAssignInExpressions: vitest-bench
    groups.push(array.slice(i, (i += size)))
  }
  return groups
}

function chunkPreInitFor<T>(array: T[], size: number): T[][] {
  const buckets = []
  for (let i = 1; i <= Math.ceil(array.length / size); i++) {
    buckets.push([])
  }

  for (let i = 0; i < array.length; i++) {
    const arrIndex = Math.ceil((i + 1) / size) - 1
    // @ts-ignore
    buckets[arrIndex].push(array[i])
  }

  return buckets
}

function chunkOptimized<T>(array: T[], size: number): T[][] {
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

const smallArray = Array.from({ length: 100 }, (_, i) => i)
const mediumArray = Array.from({ length: 1000 }, (_, i) => i)
const largeArray = Array.from({ length: 10000 }, (_, i) => i)

describe('Array chunking with small arrays (n=100)', () => {
  bench('chunkArrayFrom', () => {
    chunkArrayFrom(smallArray, 10)
  })

  bench('chunkWhile', () => {
    chunkWhile(smallArray, 10)
  })

  bench('chunkPreInitFor', () => {
    chunkPreInitFor(smallArray, 10)
  })

  bench('chunkOptimized', () => {
    chunkOptimized(smallArray, 10)
  })
})

describe('Array chunking with medium arrays (n=1000)', () => {
  bench('chunkArrayFrom', () => {
    chunkArrayFrom(mediumArray, 50)
  })

  bench('chunkWhile', () => {
    chunkWhile(mediumArray, 50)
  })

  bench('chunkPreInitFor', () => {
    chunkPreInitFor(mediumArray, 50)
  })

  bench('chunkOptimized', () => {
    chunkOptimized(mediumArray, 50)
  })
})

describe('Array chunking with large arrays (n=10000)', () => {
  bench('chunkArrayFrom', () => {
    chunkArrayFrom(largeArray, 100)
  })

  bench('chunkWhile', () => {
    chunkWhile(largeArray, 100)
  })

  bench('chunkPreInitFor', () => {
    chunkPreInitFor(largeArray, 100)
  })

  bench('chunkOptimized', () => {
    chunkOptimized(largeArray, 100)
  })
})