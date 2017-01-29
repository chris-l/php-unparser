/*jslint node: true, indent: 2 */
'use strict';

module.exports = function identifier(id) {
  if (id.resolution === 'rn') {
    return 'namespace\\' + id.name;
  } else {
    return id.name
  }
};
