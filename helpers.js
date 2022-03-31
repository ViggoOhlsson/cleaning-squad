const helpers = {
    createStamp: (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString() + " " + date.toLocaleTimeString().slice(0, -3)
},

}

module.exports = helpers