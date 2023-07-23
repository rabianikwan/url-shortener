export const responseOK = (message:string, data:object) => {
    return { message, data}
}

export const responseError = (error:string) => {
    return { error }
}
