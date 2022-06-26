import cron from "node-cron"
import type { ScheduledTask } from "node-cron"

import { setNextIncrements } from "@niconiahi/etl/services/setNextIncrements"

export function getIncrementJob(): ScheduledTask {
  return cron.schedule("15 * * * * *", async () => {
    console.log("Starting increment job =>")

    try {
      await setNextIncrements()

      console.log("Increment job was successful")
    } catch (error) {
      // TODO: send to Sentry
      console.error("Increment job failed. This is the error:", error)
    }
  })
}
