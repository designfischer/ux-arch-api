function formatResponse(status: number, data?: Object) {
    return {
        status,
        data
    }
}


export { formatResponse }