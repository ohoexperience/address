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
	subdistrictCode: number
	subdistrictName: string
	postalCode: number
}

export interface Province {
	provinceCode: number
	provinceName: string
}

export interface District {
	districtCode: number
	districtName: string
}

export interface Subdistrict {
	subdistrictCode: number
	subdistrictName: string
}

export interface PostalCode {
	postalCode: number
}

export interface DatabaseSchemaQuery {
	provinceCode?: number
	districtCode?: number
	subdistrictCode?: number
	postalCode?: number
}

export type MinifySubDistrictDatabase = [string, number, Array<number>]
export type MinifyDistrictDatabase = [string, number, Array<MinifySubDistrictDatabase>]
export type MinifyProvinceDatabase = [string, number, Array<MinifyDistrictDatabase>]
export type MinifyDatabase = Array<MinifyProvinceDatabase>
export type ComposisCondition<T> = (e: T) => boolean
