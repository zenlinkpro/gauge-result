import { ethers } from 'ethers'
import type { Fragment, JsonFragment, Result } from '@ethersproject/abi'

export function encodeEvmCallData(
  abi: string | ReadonlyArray<Fragment | JsonFragment | string>,
  method: string,
  params: any[],
): string | undefined {
  try {
    const contractInterface = new ethers.utils.Interface(abi)
    const callData = contractInterface.encodeFunctionData(method, params)

    return callData
  }
  catch (error) {
    console.error(error)

    return undefined
  }
}

export function decodeEvmCallResult(
  abi: string | ReadonlyArray<Fragment | JsonFragment | string>,
  method: string,
  result: string,
): Result | undefined {
  try {
    const contractInterface = new ethers.utils.Interface(abi)
    const callData = contractInterface.decodeFunctionResult(method, result)

    return callData
  }
  catch (error) {
    console.error(error)

    return undefined
  }
}
