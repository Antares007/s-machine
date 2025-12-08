import drawTree from './asciitree.js'
const title_map = {
  'Literal': [a => a.value.toString(), ()=> null],
  'UnaryExpression': [a => a.operator, a=> [a.argument]],
  'BinaryExpression': [a => a.operator, a=> [a.left, a.right]],
};
export default function astToString(ast) {
  return drawTree(ast, (ast) => title_map[ast.type][0](ast), (ast) => title_map[ast.type][1](ast))
}
