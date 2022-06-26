import { db } from "../helpers/db"

import { Project, big, subgraph } from "@niconiahi/etl"

type Increment = {
  count: string
  blockNumber: number
}

type IncrementsResponse = {
  increments: Increment[]
}

export async function setNextIncrements(): Promise<void> {
  const increment = await db.increment.findFirst({
    orderBy: { id: "desc" },
    include: { block: true },
  })

  async function getNextIncrements(
    lastBlockNumber: number,
  ): Promise<Increment[]> {
    const query = `
query NextIncrements ($lastBlockNumber: BigInt!) {
  increments(
    orderBy: blockNumber,
    orderDirection: desc,
    where: {blockNumber_gt: $lastBlockNumber}
  ) {
    count
    blockNumber
  }
}`

    return subgraph<IncrementsResponse>(query, Project.Counter, {
      lastBlockNumber,
    }).then(({ increments }) => increments)
  }

  const lastBLockNumber = increment?.block.number ?? 0
  const nextIncrements = await getNextIncrements(lastBLockNumber)

  async function getArrayToCommit(nextIncrements: Increment[]) {
    return Promise.all(
      nextIncrements.map(async ({ blockNumber, count }) => {
        const block = await db.block.create({ data: { number: blockNumber } })

        return {
          count: big(count).toNumber(),
          blockId: block.id,
        }
      }),
    )
  }

  const arrayToCommit = await getArrayToCommit(nextIncrements)

  await db.increment.createMany({ data: arrayToCommit })
}
