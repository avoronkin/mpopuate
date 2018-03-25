module.exports = function setValues (obj, path, valuesIndex) {
    const paths = path.split(' ')

    paths.forEach(path => {
        let currentObject = obj
        const properties = path.split('.')

        while (properties.length) {
            const property = properties.shift()
            if (!currentObject) break

            if (Array.isArray(currentObject)) {
                currentObject.forEach(obj => {
                    setValues (obj, [property, ...properties].join('.'), valuesIndex)
                })
                break
            }
            if (!properties.length) {
                currentObject[property] = valuesIndex[currentObject[property]]
            }

            currentObject = currentObject[property]
        }
    })
}
