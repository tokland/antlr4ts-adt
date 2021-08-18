grammar Calculator;

ADD: '+';
SUB: '-';
NUMBER: '-'?[0-9]+;
WHITESPACE: [ \r\n\t]+ -> skip;

start : expr=expression;

list: head+=expression? (',' tail+=expression)*;

expression
   : value=NUMBER                                         # Number
   | 'sum(' values=list ')'                               # Sum
   | '(' inner=expression ')'                             # Parentheses
   | left=expression operator=(ADD|SUB) right=expression  # AdditionOrSubtraction
   ;

