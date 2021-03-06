const parseLines = lines =>
	lines
		.map( line => ( x => { return { condition: x[0], password: x[1] || '' } } )(line.split(':')) )
		.map( line => ( x => { [ x.policy, x.letter ] = x.condition.split(' '); return x; } )(line) )
		.map( line => ( x => { [ x.lowest, x.highest ] = x.policy.split('-').map(_=>parseInt(_)); return x; } )(line) );

const solve = lines => {
	const cases = parseLines(lines);

    console.log(' ===[ PART ONE ]=============');
    console.log(
        cases
            .map( line => ( x => { x.count = (x.password.match(new RegExp(x.letter, "g")) || []).length; return x; } )(line) )
            .filter( line => line.count >= line.lowest && line.count <= line.highest )
            .length
    );
    console.log(' ===[ PART TWO ]=============');
    console.log(
        cases
            .filter( line => (line.password[line.lowest] == line.letter ? 1 : 0) + (line.password[line.highest] == line.letter ? 1 : 0) == 1 )
            .length
    );
}

require('fs').readFile(__dirname + '/input.txt', 'utf8', function(err, data) {
    if (err) throw err;
    solve(data.split('\n'));
});
