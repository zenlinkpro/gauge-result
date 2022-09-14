import { queryGaugeFarmingRate } from './queryGaugeFarmingRate.js';
import { queryFoundationFarmingRate } from './queryFoundationFarmingRate.js';
import { queryProjectFarmingRate } from './queryProjectFarmingRate.js';

import { CHAIN_CONFIG_MAP } from './config.js';
import { ChainName } from './constants.js';
import {default as invariant} from 'tiny-invariant';
export * from './constants.js';
// import  invariant from 'tiny-invariant';



export interface FarmingRateResult {
  chainName: string;
  gaugeInfo: any;
  projectInfo: any;
  foundationInfo: any;
}
export async function queryFarmingRate(chainName: string): Promise<FarmingRateResult> {
  const result = {
    chainName: chainName
  };
  const chainConfig = CHAIN_CONFIG_MAP[chainName as ChainName];
  const rpc = chainConfig.rpcUrls?.[0];
  const gaugeAddress = chainConfig.gaugeAddress;
  const multicall = chainConfig.multicall;
  invariant(rpc, 'has no rpc!');
  invariant(gaugeAddress, 'has no gaugeAddress!');
  invariant(multicall, 'has no multicall!');

  const gaugeInfo = await queryGaugeFarmingRate({
    rpc: rpc,
    gaugeAddress: gaugeAddress,
    multicall: multicall
  });

  const projectInfo = await queryProjectFarmingRate({
    rpc: rpc,
    gaugeAddress: gaugeAddress,
    multicall: multicall
  });

  const foundationInfo = await queryFoundationFarmingRate({
    rpc: rpc,
    gaugeAddress: gaugeAddress,
    multicall: multicall
  });

  return {
    chainName: chainName,
    gaugeInfo: gaugeInfo,
    projectInfo: projectInfo,
    foundationInfo: foundationInfo
  };
}