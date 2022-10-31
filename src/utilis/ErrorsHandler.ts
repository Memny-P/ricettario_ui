export function ErrorsAxiosHandler(error: any) {
    if (error && error.response &&
        Array.isArray(error.response.data))
        return error.response.data;

    return ['An error has occurred'];
}