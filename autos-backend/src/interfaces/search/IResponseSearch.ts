export interface ICarInformationResponse {
    price: number,
    km: number,
    yearFrom: number,
    brand: string,
    model: string,
    type: string[],
    bundesland: string
}

export interface IResponseSearch {
    searchedCars: ICarInformationResponse[]
}