[![npm][npm-image]][npm-url]
[![downloads][downloads-image]][npm-url]

[npm-image]:       https://img.shields.io/npm/v/qb-select-strings.svg
[downloads-image]: https://img.shields.io/npm/dm/qb-select-strings.svg
[npm-url]:         https://npmjs.org/package/qb-select-strings

A simple and surprisingly effective way to select ordered collections of strings using a combination
of greedy glob expressions and a non-greedy catch-all.

Let's say we want to fetch data from a columns of a table (these columns are from Canadian Federal Election Results)

    var cols = [
      "election_id",
      "event_number",
      "electoral_district_number_numéro_de_circonscription",
      "polling_station_number_numéro_du_bureau_de_scrutin",
      "polling_station_name_nom_du_bureau_de_scrutin",
      "poll_type",
      "electors_for_polling_station_électeurs_du_bureau",
      "urban_rural_indicator",
      "void_poll_indicator_indicateur_de_bureau_supprimé",
      "no_poll_held_indicator_indicateur_de_bureau_sans_scrutin",
      "split_indicator",
      "merge_indicator",
      "merge_with_fusionné_avec",
      "advance_poll_indicator",
      "mobile_poll_indicator",
    ]
    
Select strings allows us to craft specific ordered sets of these cumbersome columns very easily.
For example, to select id columns followed by poll... columns:

    var ss = require('qb-select-strings')
    
    ss(['*id', 'poll*'], cols)
    
    > [ 'election_id',
    >   'polling_station_number_numéro_du_bureau_de_scrutin',
    >   'polling_station_name_nom_du_bureau_de_scrutin',
    >   'poll_type' ]

To select id columns, then polling columns, then indicators, then any other columns:

    ss(['*id', 'poll*', '*indicator*', '*'], cols))
    
    > [ 'election_id',
    >   'polling_station_number_numéro_du_bureau_de_scrutin',
    >   'polling_station_name_nom_du_bureau_de_scrutin',
    >   'poll_type',
    >   'urban_rural_indicator',
    >   'void_poll_indicator_indicateur_de_bureau_supprimé',
    >   'no_poll_held_indicator_indicateur_de_bureau_sans_scrutin',
    >   'split_indicator',
    >   'merge_indicator',
    >   'advance_poll_indicator',
    >   'mobile_poll_indicator',
    >   'event_number',
    >   'electoral_district_number_numéro_de_circonscription',
    >   'electors_for_polling_station_électeurs_du_bureau',
    >   'merge_with_fusionné_avec' ]


**Complies with the 100% test coverage and minimum dependency requirements** of 
[qb-standard](http://github.com/quicbit-js/qb-standard) . 


# install

npm install qb-select-strings

# qb-select-strings

Selects arrays of strings from a source array using simple glob (*) expressions. 

    var sm = require('qb-select-strings')
    
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
