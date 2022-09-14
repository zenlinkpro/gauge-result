import { queryFarmingRate } from '../src/index.js';
import { ChainName } from '../src/constants.js';


const result = await queryFarmingRate(ChainName.Moonbase);

console.log('result', JSON.stringify(result, null, 2));