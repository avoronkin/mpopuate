module.exports = function getValues (obj, path) {
    const paths = path.split(' ')
    let values = []

    paths.forEach(path => {
        const properties = path.split('.')
        const lastIndex = properties.length - 1
        let currentObject = obj

        for (let index = 0; index < properties.length; ++index) {
            const property = properties[index]

            if (Array.isArray(currentObject)) {
                currentObject.forEach(function (item) {
                    values = values.concat(getValues(item, properties.slice(index).join('.')))
                })

                break
            }

            if (currentObject) {
                currentObject = currentObject[property]

                if ((lastIndex === index) && typeof currentObject !== 'undefined') {
                    values.push(currentObject)
                }
            }
        }

    })

    return uniq(flatten(values))
}

const flatten = arr => {
    while (arr.find(el => Array.isArray(el))) arr = Array.prototype.concat(...arr)
    return arr
}

function uniq (a) {
    return [...new Set(a.map(o => JSON.stringify(o)))].map(s => JSON.parse(s))
}
