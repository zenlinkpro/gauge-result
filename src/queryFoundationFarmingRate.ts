import { default as axios} from 'axios';
import  { default as JSBI } from 'jsbi';
import { farmingAbi } from './abi/farmingAbi.js';
import { gaugeAbi } from './abi/gaugeAbi.js';
import { multicallAbi } from './abi/multicallCallAbi.js';
import { queryFoundationReward } from './reward/foundation.js';
import { decodeEvmCallResult, encodeEvmCallData } from './util/util.js';


export interface ProjectRewards {
  pid: number;
  token: string;
  amount: number | string;
}
export interface FoundationParam {
  gaugeAddress: string;
  rpc: string;
  multicall: string;
}

export async function queryFoundationFarmingRate(param: FoundationParam) {
  const projectRewards: ProjectRewards[] = await queryFoundationReward();
  return {
    projectRewards: projectRewards
  };
}