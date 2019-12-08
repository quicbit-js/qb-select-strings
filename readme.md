# qb-select-strings

Selects arrays of strings from a source array using simple glob (*) expressions. 

    var sm = require('strmatch')
    
    sm.select(['b'],     ['a','b','c'])
    ['b']
    
    sm.select('b*', ['ab','bb','cb'])
    ['bb']
    
    sm.select('*b', ['ab','bb','cb'])
    ['ab','bb','cb']


'*' by itself has special meaning and matches all strings not matched by the
other expressions (non-greedy collector of all remaining strings).

    // move 'b' to the front
    sm.select(['b','*'], ['a','b','c'])   
    ['b','a','c']
    
    // move 'b' to the back
    sm.select(['*','b'], ['a','b','c'])
    ['a','c','b']
