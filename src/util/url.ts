type Parameterizable = {
    [key: string]: string | number
}

export const queryParamsFrom = (obj: Parameterizable) => {
    const params = new URLSearchParams()
    Object.entries(obj).forEach(([key,value]) => {
        if (value) params.append(key, value.toString())
    })
    console.log(Array.from(params.entries()))
    return params.toString()
}