module.exports = {
  input: [
    'src/**/*.{js,jsx,ts,tsx}'
  ],
  output: './',
  options: {
    debug: false,
    removeUnusedKeys: false,
    sort: true,
    lngs: ['en', 'zh', 'ja', 'ko'],
    defaultLng: 'en',
    defaultNs: 'translation',
    resource: {
      loadPath: 'src/locales/{{lng}}Translation.json',
      savePath: 'src/locales/{{lng}}Translation.json'
    },
    ns: [
      'translation'
    ],
    defaultValue: '',
    keySeparator: false,
    nsSeparator: false
  }
};
