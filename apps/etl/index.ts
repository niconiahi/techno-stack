import { getIncrementJob } from "./jobs"

export * from "./jobs"
export * from "./types"
export * from "./helpers"
export * from "./services"

async function start() {
  console.log("Starting ETL =>")

  getIncrementJob().start()
}

await start()
