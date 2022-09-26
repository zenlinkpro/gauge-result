import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    'src/index',
  ],
  declaration: true,
  clean: true,
  rollup: {
    emitCJS: true,
  },
  // due to https://rollupjs.org/guide/en/#error-this-is-undefined
  failOnWarn: false,
})
