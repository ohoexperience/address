export interface GeographyDTO {
	id: number
	provinceCode: number
	provinceNameEn: string
	provinceNameTh: string
	districtCode: number
	districtNameEn: string
	districtNameTh: string
	subdistrictCode: number
	subdistrictNameEn: string
	subdistrictNameTh: string
	postalCode: number
}

export interface DatabaseSchema {
	provinceCode: number
	provinceName: string
	districtCode: number
	districtName: string
	subDistrictCode: number
	subDistrictName: string
	postalCode: number
}

export interface DatabaseSchemaQuery {
	provinceCode?: number
	districtCode?: number
	subDistrictCode?: number

	postalCode?: number
	provinceName?: string
	districtName?: string
	subDistrictName?: string
}

export type MinifySubDistrictDatabase = [string, number, Array<number>]
export type MinifyDistrictDatabase = [string, number, Array<MinifySubDistrictDatabase>]
export type MinifyProvinceDatabase = [string, number, Array<MinifyDistrictDatabase>]
export type MinifyDatabase = Array<MinifyProvinceDatabase>
export type ComposisCondition<T> = (e: T) => boolean

export type MapCallback<Res> = (row: DatabaseSchema) => Res
export type ReduceCallback<Init> = (init: Init, row: DatabaseSchema) => Init
