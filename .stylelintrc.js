module.exports = {
  plugins: ['stylelint-order'],
  extends: ['stylelint-config-sass-guidelines'],
  rules: {
    'order/properties-alphabetical-order': true,
    'max-nesting-depth': [5],
    'string-quotes': 'double'
  },
}
