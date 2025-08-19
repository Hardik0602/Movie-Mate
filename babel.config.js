const { default: plugin } = require("tailwindcss");
module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: ['nativewind/babel'],
};