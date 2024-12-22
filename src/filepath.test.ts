import { describe, it, expect } from "vitest"
import { ext } from "./filepath"

describe("ext", () => {
  it("should extract simple extensions", () => {
    expect(ext("file.txt")).toBe("txt")
    expect(ext("image.png")).toBe("png")
    expect(ext("document.pdf")).toBe("pdf")
  })

  it("should handle files without extensions", () => {
    expect(ext("filename")).toBeUndefined()
    expect(ext("README")).toBeUndefined()
  })

  // Edge cases
  it("should handle hidden files", () => {
    expect(ext(".gitignore")).toBeUndefined()
    expect(ext(".env")).toBeUndefined()
  })

  it("should handle multiple dots", () => {
    expect(ext("archive.tar.gz")).toBe("gz")
    expect(ext("script.test.js")).toBe("js")
    expect(ext("styles.module.css")).toBe("css")
  })

  it("should handle special characters in filename", () => {
    expect(ext("my-file.txt")).toBe("txt")
    expect(ext("file_name.js")).toBe("js")
    expect(ext("file 2.pdf")).toBe("pdf")
  })

  it("should handle paths with directories", () => {
    expect(ext("/path/to/file.txt")).toBe("txt")
    expect(ext("./relative/path/image.png")).toBe("png")
    expect(ext("C:\\Windows\\file.exe")).toBe("exe")
  })

  // Corner cases
  it("should handle empty strings", () => {
    expect(ext("")).toBeUndefined()
  })

  it("should handle dots at various positions", () => {
    expect(ext(".")).toBeUndefined()
    expect(ext("..")).toBeUndefined()
    expect(ext("...")).toBeUndefined()
    expect(ext("file.")).toBeUndefined()
  })

  // Unicode support
  it("should handle unicode filenames", () => {
    expect(ext("文件.txt")).toBe("txt")
    expect(ext("файл.pdf")).toBe("pdf")
    expect(ext("파일.jpg")).toBe("jpg")
  })
})
