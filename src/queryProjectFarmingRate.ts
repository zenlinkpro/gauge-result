import { default as axios} from 'axios';
import  { default as JSBI } from 'jsbi';
import { farmingAbi } from './abi/farmingAbi.js';
import { gaugeAbi } from './abi/gaugeAbi.js';
import { multicallAbi } from './abi/multicallCallAbi.js';
import { queryProjectReward } from './reward/project.js';
import { decodeEvmCallResult, encodeEvmCallData } from './util/util.js';


export interface ProjectRewards {
  pid: number;
  token: string;
  amount: number | string;
}
export interface ProjectParam {
  gaugeAddress: string;
  rpc: string;
  multicall: string;
}

export async function queryProjectFarmingRate(param: ProjectParam) {
  const projectRewards: ProjectRewards[] = await queryProjectReward();
  return {
    projectRewards: projectRewards
  };
}