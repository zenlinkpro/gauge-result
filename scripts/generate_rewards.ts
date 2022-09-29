import fs from 'fs/promises'
import { dirname } from 'pathe'
import fg from 'fast-glob'
import { version } from '../package.json'
import type { GaugeRewards } from '../src/types'

function capitalizeFirstLetter(s: string) {
  return s.slice(0, 1).toUpperCase() + s.slice(1).toLowerCase()
}

const dirs = [
  'basic',
  'fundation',
  'project',
]

console.log()
console.log(`rewards v${version}`)

for (const dir of dirs) {
  const files = fg.sync(`src/rewards/${dir}/**/period_[[:digit:]].json`, {
    absolute: true,
  })
  const configMap: { [chainName: string]: GaugeRewards[] } = {}
  let content = ''
  for (const file of files) {
    const paths = dirname(file).split('/')
    const chainName = capitalizeFirstLetter(paths[paths.length - 1])
    const code = await fs.readFile(file, 'utf8')
    configMap[chainName] = [
      ...(configMap[chainName] || []),
      {
        ...JSON.parse(code),
        type: `${dir}`,
      },
    ]
  }
  content = `// Auto generated\n\n export const ${dir}Rewards = ${JSON.stringify(configMap, null, 2)}`
  await fs.writeFile(`src/rewards/${dir}/index.ts`, content, 'utf-8')
}
