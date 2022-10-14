import fs from 'fs/promises'
import { dirname } from 'pathe'
import fg from 'fast-glob'
import { ESLint } from 'eslint'
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
  const targetFile = `src/rewards/${dir}/${dir}.json`
  await fs.writeFile(
    targetFile,
    `${JSON.stringify(configMap, null, 2)}`,
    'utf-8',
  )

  const eslint = new ESLint({
    fix: true,
  })
  const results = await eslint.lintFiles([targetFile])
  await ESLint.outputFixes(results)
  const formatter = await eslint.loadFormatter('stylish')
  formatter.format(results)
}
