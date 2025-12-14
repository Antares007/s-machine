import {PinkΤRed_descend, and, or} from './s.js'
class Programmer {
  constructor(o, s) {
    this.o = o;
    this.pro_grammar = { o: s, t: 0, a: 0, r: 0, s: s.length, symbols: [], axioms: [], data_states: [] };
  }
  DBT(opcode, symbol, set) {
    var { o, a } = this.pro_grammar;
    o[a++] = opcode;
    if ((o[a++] = set.indexOf(symbol)) === -1)
      (o[a - 1] = set.length, set.push(symbol));
    return this.pro_grammar.a = a, this;
  }
  D(symbol) { return this.DBT(1, symbol, this.pro_grammar.symbols); }
  B(ablock) { return this.DBT(2, ablock, this.pro_grammar.axioms); }
  T(symbol) { return this.DBT(3, symbol, this.pro_grammar.symbols); }
  go() { PinkΤRed_descend(this.o, this.pro_grammar) }
}

new Programmer({ b: 0, expr: Array(10) }, new Int16Array(2048))
  .D("S").T("expression").B(term("=")).T("expression").B(op_binary((a,b) => a - b)).B(ast_binary("=")).B(equalsTo(0)).B(print_expr).B(print_tree).B((o,s) => setTimeout(() => and(o,s), 0))
  .D("constant").B(term("x")).B(op_const(1)).B(ast_const(1))
  .D("constant").B(term("2x")).B(op_const(2)).B(ast_const(2))
  .D("constant").B(term("3x")).B(op_const(3)).B(ast_const(3))
  .D("primary").T("constant")
  .D("primary").B(term("(")).T("expression"). B(term(")"))
  .D("unary").T("primary")
  .D("unary").B(term("-")).T("unary").B(op_unary(a => -a)).B(ast_unary('-'))
  .D("unary").B(term("!")).T("unary").B(op_unary(a => !a | 0)).B(ast_unary('!'))
  .D("multiplicative").T("unary")
  .D("multiplicative").T("multiplicative").B(term("*")).T("unary").B(op_binary((a,b) => a*b)).B(ast_binary("*"))
  .D("multiplicative").T("multiplicative").B(term("/")).T("unary").B(op_binary((a,b) => a/b)).B(ast_binary("/"))
  .D("additive").T("multiplicative")
  .D("additive").T("additive").B(term("+")).T("multiplicative").B(op_binary((a,b) => a+b)).B(ast_binary("+"))
  .D("additive").T("additive").B(term("-")).T("multiplicative").B(op_binary((a,b) => a-b)).B(ast_binary("-"))
  .D("expression").T("additive")
  .go();

import astToString from './ast2asciitree.js'

function print_expr (o,s) { return (console.log(o.expr.slice(0, o.b).join("").padStart(o.expr.length)), and(o,s)) }
function print_tree (o,s) { return (console.log(astToString(o.ast[0])), and(o,s)) }
function term (str) { return (o,s) => setImmediate(() => (o.b < o.expr.length ? (o.expr[o.b++] = str, and) : or)(o,s)) }
function equalsTo (value) { return (o,s) => setImmediate(() => (o.rez[0] === value ? and:or)(o,s)) }
function binary_sa (k) { return action => (o,s) => (o[k] = [action(o[k][1][0], o[k][0]), o[k][1][1]], and(o,s)) }
function unary_sa (k) { return action => (o,s) => (o[k] = [action(o[k][0]), o[k][1]], and(o,s)) }
function id_sa (k) { return id => (o,s) => (o[k] = [id, o[k]], and(o,s)) }
function op_const (value) { return id_sa('rez') (value) }
function op_unary (operator) { return unary_sa('rez') (operator) }
function op_binary (operator) { return binary_sa('rez')(operator) }
function ast_const (value) { return id_sa('ast')({type:"Literal", value}) }
function ast_unary (operator) { return unary_sa('ast')((argument) => ({type:"UnaryExpression", operator, argument})) }
function ast_binary (operator) { return binary_sa('ast')((left, right) => ({type:"BinaryExpression", operator, left, right})) }

