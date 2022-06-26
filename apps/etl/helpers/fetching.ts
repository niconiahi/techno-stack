export enum Project {
  Mint = "MINT",
  Waver = "WAVER",
  Counter = "COUNTER",
}

export async function subgraph<T>(
  query: string,
  project: Project,
  variables?: { [key: string]: any },
): Promise<T> {
  function getEndpoint(project: Project): string {
    switch (project) {
      case Project.Mint: {
        return process.env.SUBGRAPH_MINT
      }
      case Project.Waver: {
        return process.env.SUBGRAPH_WAVER
      }
      case Project.Counter: {
        return process.env.SUBGRAPH_COUNTER
      }
    }
  }

  return fetch(getEndpoint(project), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query,
      ...(variables ? variables : {}),
    }),
  })
    .then((response) => response.json())
    .then((response) => response.data)
}
