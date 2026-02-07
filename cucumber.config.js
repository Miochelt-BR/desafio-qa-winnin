export default {
  paths: ['tests/features/*.feature'],
  import: ['tests/steps/*.ts'],
  loader: ['ts-node/esm'],
  format: ['progress', 'summary'],
  defaultTimeout: 60000
}