utils = {
    wait: function (t) { 
        new Promise(ok => setTimeout(ok, t)) 
    }
}

module.exports = utils