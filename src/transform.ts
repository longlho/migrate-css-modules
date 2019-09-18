
import {FileInfo, API, StringLiteral, ImportDeclaration} from 'jscodeshift'
const foo = {
    'mc-bar-1': 'asd'
}

/**
 * This replaces every occurrence of variable "foo".
 */
module.exports = function(fileInfo: FileInfo, {j, jscodeshift}: API) {
    const nodes = jscodeshift(fileInfo.source)
    const importNodes = []
    nodes.find(StringLiteral)
        .filter(path => path.value.value === 'mc-bar-1') 
      .forEach(path => importNodes.push(j.importDeclaration(
          [j.importNamespaceSpecifier(j.identifier('foo'))],
          j.literal(`${foo[path.value.value]}.css`),
      )))
      .replaceWith(j.memberExpression(j.identifier('foo'), j.literal('mc-bar-1')))
      nodes.find(ImportDeclaration).insertBefore(importNodes)
    return nodes.toSource();
  }
  module.exports.parser = 'tsx'