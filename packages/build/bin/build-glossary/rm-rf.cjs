/* eslint-disable */
const { rmSync } = require('fs');

module.exports = function rmRf(dir) {
  try {
    rmSync(dir, { recursive: true });
  } catch (err) {}
};
