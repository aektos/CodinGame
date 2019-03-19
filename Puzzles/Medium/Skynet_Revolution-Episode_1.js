/**
 * Get the first input
 * (total number of nodes in the level, number of links, number of exit gateways)
 *
 **/
var inputs = readline().split(' ');
var N = parseInt(inputs[0]); // the total number of nodes in the level, including the gateways
var L = parseInt(inputs[1]); // the number of links
var E = parseInt(inputs[2]); // the number of exit gateways

/**
 * List the network
 *
 **/
var net = {};
for (let i = 0; i < L; i++) {
    inputs = readline().split(' ');
    var N1 = parseInt(inputs[0]); // N1 and N2 defines a link between these nodes
    var N2 = parseInt(inputs[1]);

    if ( typeof net[N1] !== 'undefined' ) {
        net[N1].push(N2)
    } else {
        net[N1] = [N2];
    }

    if ( typeof net[N2] !== 'undefined' ) {
        net[N2].push(N1)
    } else {
        net[N2] = [N1];
    }
}

/**
 * List all the exit gateways
 *
 **/
var gateways = [];
for (let i = 0; i < E; i++) {
    var EI = parseInt(readline()); // the index of a gateway node
    gateways.push(EI);
}

/**
 * Run through all paths to a gateway
 * without running over several times on same nodes
 *
 **/
function runThroughNet(SI, path = []) {
    let result = [];
    let siNetLen = net[SI].length;
    path.push(SI);
    for(let i = 0; i < siNetLen; i++) {
        let node = net[SI][i];
        let tmpPath = JSON.parse(JSON.stringify(path)); // JSON.stringify then JSON.parse to clone the object
        if (gateways.indexOf(node) === -1 && path.indexOf(node) === -1) {
            let tmpResult = runThroughNet(node, tmpPath);
            result = result.concat(tmpResult);
        } else if (gateways.indexOf(node) !== -1) {
            tmpPath.push(node);
            result.push(tmpPath);
        }
    }
    return result;
}

/**
 * Get the fastest path to a gateway
 * from a list of path
 *
 **/
function getFastestGatewayPath(SI) {
    let result = runThroughNet(SI);
    result.sort(function(a, b) {
        return a.length > b.length ? 1 : -1;
    });
    return result[0];
}

/**
 * Display the result in the standard output
 *
 **/
function output(result) {
    if (result.length >= 2) {
        print(result[0] + ' ' + result[1]);
    }
}

// game loop
while (true) {
    var SI = parseInt(readline()); // The index of the node on which the Skynet agent is positioned this turn
    var result = getFastestGatewayPath(SI);
    output(result);
}