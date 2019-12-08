var ss = require('.')

// These are columns from Canadian Federal Election Data at
// https://www.kaggle.com/smid80/canadian-federal-election-results-timeseries
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

// To select any columns ending with "id":
console.log(ss(['*id'], cols))
// > [ 'election_id' ]

// To select id then polling columns
console.log(ss(['*id', 'poll*'], cols))
// > [ 'election_id',
// >   'polling_station_number_numéro_du_bureau_de_scrutin',
// >   'polling_station_name_nom_du_bureau_de_scrutin',
// >   'poll_type' ]

// To select id, polling, then indicators, then all others:

console.log(ss(['*id', 'poll*', '*indicator*', '*'], cols))
// > [ 'election_id',
// >   'polling_station_number_numéro_du_bureau_de_scrutin',
// >   'polling_station_name_nom_du_bureau_de_scrutin',
// >   'poll_type',
// >   'urban_rural_indicator',
// >   'void_poll_indicator_indicateur_de_bureau_supprimé',
// >   'no_poll_held_indicator_indicateur_de_bureau_sans_scrutin',
// >   'split_indicator',
// >   'merge_indicator',
// >   'advance_poll_indicator',
// >   'mobile_poll_indicator',
// >   'event_number',
// >   'electoral_district_number_numéro_de_circonscription',
// >   'electors_for_polling_station_électeurs_du_bureau',
// >   'merge_with_fusionné_avec' ]
