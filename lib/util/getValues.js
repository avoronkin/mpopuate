module.exports = function (obj, path) {
    const paths = path.split(' ')
    let values = []

    paths.forEach(path => {
        getValues (values, obj, path)
    })

    return [...new Set(values.map(o => JSON.stringify(o)))].map(s => JSON.parse(s))
}

function getValues (values, obj, path) {
    const properties = path.split('.')
    const lastIndex = properties.length - 1
    let currentObject = obj

    for (let index = 0; index < properties.length; ++index) {
        const property = properties[index]

        if (Array.isArray(currentObject)) {
            currentObject.forEach(function (item) {
                getValues(values, item, properties.slice(index).join('.'))
            })

            break
        }

        if (currentObject) {
            currentObject = currentObject[property]

            if ((lastIndex === index) && typeof currentObject !== 'undefined') {
                if (Array.isArray(currentObject)) {
                    currentObject.forEach(function (item) {
                        values.push(item)
                    })
                } else {
                    values.push(currentObject)
                }
            }
        }
    }
}
