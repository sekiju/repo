import { bench, describe } from "vitest"
// biome-ignore lint/style/useNodejsImportProtocol: vitest-bench
import { extname as extPath } from "path"

function extBit(filepath: string): string | undefined {
  return filepath.slice(((filepath.lastIndexOf(".") - 1) >>> 0) + 2)
}

function extSplit(filepath: string): string | undefined {
  return filepath.split(".").pop()
}

function extReg(filepath: string): string | undefined {
  const match = /[^.]+$/.exec(filepath)
  return match ? match[0] : undefined
}

function extSlice(filepath: string): string | undefined {
  const index = filepath.lastIndexOf(".")
  if (index <= 0 || index === filepath.length - 1) return undefined
  return filepath.slice(index + 1)
}

describe("extension extraction benchmarks", () => {
  const testCases = [
    "file.txt",
    "image.png",
    "document.pdf",
    "filename",
    "README",
    ".gitignore",
    ".env",
    "archive.tar.gz",
    "script.test.js",
    "styles.module.css",
    "my-file.txt",
    "file_name.js",
    "file 2.pdf",
    "/path/to/file.txt",
    "./relative/path/image.png",
    "C:\\Windows\\file.exe",
    "",
    ".",
    "..",
    "...",
    "file.",
    "文件.txt",
    "лоликон.pdf",
    "파일.jpg",
  ]

  bench("bit approach", () => {
    for (const filename in testCases) {
      extBit(filename)
    }
  })

  bench("regex approach", () => {
    for (const filename in testCases) {
      extReg(filename)
    }
  })

  bench("split approach", () => {
    for (const filename in testCases) {
      extSplit(filename)
    }
  })

  bench("slice approach", () => {
    for (const filename in testCases) {
      extSlice(filename)
    }
  })

  bench("standard library approach", () => {
    for (const filename in testCases) {
      extPath(filename)
    }
  })
})
