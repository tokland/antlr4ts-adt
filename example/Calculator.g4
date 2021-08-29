grammar Calculator;

ADD: '+';
SUB: '-';
NUMBER: '-'?[0-9]+;
WHITESPACE: [ \r\n\t]+ -> skip;

start : expression;

exprList: head+=expression? (',' tail+=expression)*;

aggregateFn: name=('sum' | 'product');

expression
   : value=NUMBER                                         # number
   | fn=aggregateFn '(' values=exprList ')'               # aggregate
   | '(' inner=expression ')'                             # parentheses
   | left=expression operator=(ADD|SUB) right=expression  # additionOrSubtraction
   ;

