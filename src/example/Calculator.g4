grammar Calculator;

ADD: '+';
SUB: '-';
NUMBER: '-'?[0-9]+;
WHITESPACE: [ \r\n\t]+ -> skip;

start : expr=expression;

exprList: head+=expression? (',' tail+=expression)*;

aggregateFn: name=('sum' | 'product');

expression
   : value=NUMBER                                         # Number
   | fn=aggregateFn '(' values=exprList ')'               # Aggregate
   | '(' inner=expression ')'                             # Parentheses
   | left=expression operator=(ADD|SUB) right=expression  # AdditionOrSubtraction
   ;

