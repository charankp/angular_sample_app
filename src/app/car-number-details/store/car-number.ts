export interface CarNumber {
    id: number,
    ownerName: string,
    number: string
}


export interface carRegState {
    numbers: CarNumber[];
}