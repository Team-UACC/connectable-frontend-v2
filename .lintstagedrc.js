module.exports = {
  // Type check TypeScript files
  'src/**/*.(ts|tsx)': () => 'yarn tsc --noEmit',

  // Lint TS and JS files
  'src/**/*.(ts|tsx|js)': filenames =>
    `yarn lint --fix --file ${filenames.map(file => file.split(process.cwd())[1]).join(' --file ')}`,
};
