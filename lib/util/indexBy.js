module.exports = function (values, key) {
    return values.reduce((index, value) => {
        if (value[key]) {
            index[value[key]] = value
        }

        return index
    }, {})
}
