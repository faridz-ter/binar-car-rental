export type BoolCarStatus = boolean;

export interface ICar {
    car_id: number,
    plate: string,
    manufacture: string,
    image: string,
    model: string,
    type: string,
    description: string,
    transmission: string,
    capacity: number,
    rentPerDay: string,
    availableAt: string,
    available: BoolCarStatus,
    year: number,
    options: object,
    specs: object,
    created_by: number,
    updated_by: number,
}