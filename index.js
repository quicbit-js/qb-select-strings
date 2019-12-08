'use strict'

// wrap regex to pave way for regex cache optimization (for repeatedly matching same string lists 1000000's of times)
function MatchRE(expr) {
    this.expr = expr
}
MatchRE.prototype.test = function(s) {
    return this.expr.test(s)
}

function MatchStr(s) {
    this.s = s
}
MatchStr.prototype.test = function(s) {
    return this.s === s
}

function rex(expr) {
    if(typeof expr === 'string') {
        if(expr.indexOf('*') === -1) {
            return new MatchStr(expr)
        } else if(expr === '*') {
            return '*'  // special expression.  non-greedy. collects all unmatched.
        } else {
            return new MatchRE(new RegExp(escape_re(expr)))
        }
    } else {
        if(!expr) {
            throw Error('expected string or RegExp, but got: ' + (typeof expr))
        }
        return new MatchRE(expr)
    }
}

function escape_re(s) {
    s = s.replace(/[-[\]{}()+?.,\\^$|#\s]/g, '\\$&');  // escape everything except '*'
    return '^' + s.replace(/[*]/g, '.*')  + '$'        // xyz*123 -> ^xyz.*123$
}

function select(expressions, strings) {
    return _select(expressions.map(function(e){ return rex(e) }), strings)
}

// insert all items from array b into array a at offset off
//   inject([0,3], 1, [1,2])  gives:  [0,1,2,3]
function inject(a, off, b) {

    var alen = a.length
    var blen = b.length

    for (var i=alen-1; i>=off; i--) { a[i + blen] = a[i] } // move items to end. copyWithin() not supported by InternetExplorer
    for (i=0; i<blen; i++) { a[off + i] = b[i] }

    return a
}

function _select (expressions, strings) {
    var rem = strings.slice()
    var ret = []
    var rem_index = -1           // offset at which to insert all remaining ('*') items
    expressions.forEach(function(expr) {
        if(rem.length === 0) {
            return ret
        }
        if(expr === '*') {
            if (rem_index === -1) {     // ignore subsequent match-all (just as overlapping expressions are greedy)
                rem_index = ret.length
            }
        } else {
            for(var i=0; i<rem.length; i++) {
                var s = rem[i]
                if(expr.test(s)) {
                    ret.push(s)
                    rem.splice(i, 1)
                    i-- // compensate for splice
                }
            }
        }
    })
    if(rem_index !== -1) {
        inject(ret, rem_index, rem)
    }
    return ret
}

select._inject = inject
select._escape_re = escape_re
module.exports = select
