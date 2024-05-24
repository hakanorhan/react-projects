export interface Brand {
    brandId: number,
    brand: string
}

export interface Model {
    modelId: number,
    model: string
}

// ---- Axios Data Packet ---
export interface AxiosDataPacketBrand {
    dataBrands: Brand[],
    message: string | null
}