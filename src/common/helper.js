export const getFileNames = (files) => {
    if (files?.length > 0) {
        const fileNames = files.reduce((acc, file, index) => {
            if (index > 0) {
                acc = acc + ' | ' + file?.name
            } else {
                acc = acc + file?.name
            }
            return acc
        }, '')
        return fileNames
    }
}