
import fs from "fs/promises"
import path from "path"

const filePath = path.join(process.cwd(), "data", "instancias.json")

export async function getCurrentInstance(): Promise<{ id: string, token: string }> {
  const raw = await fs.readFile(filePath, "utf-8")
  const data = JSON.parse(raw)
  return data.lista[data.atual]
}

export async function advanceInstance(): Promise<void> {
  const raw = await fs.readFile(filePath, "utf-8")
  const data = JSON.parse(raw)

  if (data.atual < data.lista.length - 1) {
    data.atual += 1
    await fs.writeFile(filePath, JSON.stringify(data, null, 2))
  }
}
