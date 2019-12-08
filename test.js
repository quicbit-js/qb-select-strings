'use strict'

var selstr = require('.')
var test = require('test-kit').tape()

test('_inject', function (t) {
    t.table_assert([
        ['a',    'off', 'insert', 'exp'],
        [[],     0,     [],       []],
        [[],     0,     [3],      [3]],
        [[],     1,     [3],      [,3]],
        [[1,2],  0,     [3],      [3,1,2]],
        [[1],    0,     [3],      [3,1]],
    ], selstr._inject)
})

test('_escape_re', function (t) {
    t.table_assert([
        ['s',               'exp'],
        ['*',               '^.*$'],
        ['a|*2#(',          '^a\\|.*2\\#\\($'],
    ], selstr._escape_re)
})

test('select zero or one', function (t) {
    t.table_assert([
        [ 'expressions',    'strings', 'expect'],
        [ ['b'],            [],  []],
        [ ['b'],            ['b'],          ['b'] ],
        [ ['b'],            ['a','b'],      ['b'] ],
        [ ['b'],            ['b','c'],      ['b'] ],
        [ ['b'],            ['a','b','c'],  ['b'] ],
        [ ['b*'],           ['b'],          ['b'] ],
        [ ['b'],            ['bc'],         [] ],
        [ ['b'],            ['ab'],         [] ],
        [ ['*'],            [],             [] ],
        [ ['*'],            [''],           ['']],
        [ ['*'],            ['ab'],         ['ab'] ],
        [ ['b*'],           ['bc'],         ['bc'] ],
        [ ['*b'],           ['ab'],         ['ab'] ],
        [ ['*b'],           ['a','ab','c'], ['ab'] ],
    ], selstr)
})

test('select many', function (t) {
    t.table_assert([
        ['expressions',      'strings',              'expect'],
        [['a','b'],          ['a', 'b'],             ['a','b']],
        [['*'],              ['a','b'],              ['a','b']],
        [['a','c'],          ['a','b','c'],          ['a','c']],
        [['c','*'],          ['a','b','c'],          ['c','a','b']],
        [['*','c'],          ['a','b','c'],          ['a','b','c']],
        [['*','c','a'],      ['a','b','c'],          ['b','c','a']],
        [['*','c','a', '*'], ['a','b','c'],          ['b','c','a']],
        [['c','*'],          ['a','','c'],           ['c','a','']],
        [['c','*'],          ['a',undefined,'c'],    ['c','a',undefined]],
        [
            ['fr*', 't*', /((at)|(as)).*/, '*'],
            ['from', 'tangy', 'title', 'fribble', 'fact', 'slipper', 'at', 'ask' ],
            ['from', 'fribble', 'tangy', 'title', 'at', 'ask', 'fact', 'slipper']
        ]
    ], selstr)
})

test('error', function (t) {
    t.table_assert(
        [
            ['expressions', 'strings', 'err'],
            [['c', undefined, 'b'], ['a','b','c'], /expected string or RegExp/ ],
        ],
        selstr,
        { assert: 'throws' }
    )
})