import { BigNumber } from "@ethersproject/bignumber"

export function big(value: number | string): BigNumber {
  return BigNumber.from(value)
}
