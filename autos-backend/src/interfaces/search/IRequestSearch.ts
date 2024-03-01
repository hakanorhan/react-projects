export interface ICarInformationRequest {
    price: number | null,
    km: number | null,
    yearFrom: number | null,
    yearTo: number | null,
    brand: string | null,
    model: string | null,
    type: string[] | null,
    bundesland: string | null
}

export interface IRequestSearchFast {
    carInformation: ICarInformationRequest
}