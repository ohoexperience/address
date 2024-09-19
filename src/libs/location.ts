import { Entries } from 'type-fest'
import {
	ComposisCondition,
	DatabaseSchema,
	DatabaseSchemaQuery,
	District,
	MinifyDatabase,
	PostalCode,
	Province,
	Subdistrict,
} from './interfaces.js'
import minifyDB from './minifyDB'

let database!: DatabaseSchema[]

export class Location {
	private database: DatabaseSchema[] = []
	constructor() {
		if (!database) {
			database = []

			for (const province of minifyDB as MinifyDatabase) {
				for (const district of province[2]) {
					for (const subdistrict of district[2]) {
						for (const postalCode of subdistrict[2]) {
							database.push({
								provinceName: province[0],
								provinceCode: province[1],
								districtName: district[0],
								districtCode: district[1],
								subdistrictName: subdistrict[0],
								subdistrictCode: subdistrict[1],
								postalCode: postalCode,
							})
						}
					}
				}
			}
		}

		this.database = database
	}

	private combineQuery(queries: ComposisCondition<DatabaseSchema>[]) {
		return this.database.filter((row) => queries.every((query) => query(row)))
	}

	private createQueryArray(
		key: 'provinceName' | 'districtName' | 'subdistrictName' | 'postalCode' | undefined,
		search: string,
		option?: DatabaseSchemaQuery,
	): ComposisCondition<DatabaseSchema>[] {
		const queries: ComposisCondition<DatabaseSchema>[] = []

		if (option) {
			for (const [property, value] of Object.entries(option) as Entries<DatabaseSchemaQuery>) {
				queries.push((row) => row[property] === value)
			}
		}

		if (!key) {
			return queries
		}

		queries.push(
			key === 'postalCode'
				? (row) => row.postalCode.toString().startsWith(search)
				: (row) => row[key].startsWith(search),
		)
		return queries
	}

	getSubdistrict(search: string, option?: DatabaseSchemaQuery): Subdistrict[] {
		const subdistrictMap = new Map<number, Subdistrict>()

		for (const row of this.combineQuery(this.createQueryArray('subdistrictName', search, option))) {
			let curProv = subdistrictMap.get(row.subdistrictCode)
			if (!curProv) {
				subdistrictMap.set(row.subdistrictCode, {
					subdistrictCode: row.subdistrictCode,
					subdistrictName: row.subdistrictName,
				})
			}
		}
		return Array.from(subdistrictMap.values())
	}

	getPostalCode(search: string, option?: DatabaseSchemaQuery): PostalCode[] {
		const postalCodeMap = new Map<number, PostalCode>()

		for (const row of this.combineQuery(this.createQueryArray('postalCode', search, option))) {
			let curProv = postalCodeMap.get(row.postalCode)
			if (!curProv) {
				postalCodeMap.set(row.postalCode, { postalCode: row.postalCode })
			}
		}
		return Array.from(postalCodeMap.values())
	}

	getDistrict(search: string, option?: DatabaseSchemaQuery): District[] {
		const districtMap = new Map<number, District>()

		for (const row of this.combineQuery(this.createQueryArray('districtName', search, option))) {
			let curProv = districtMap.get(row.districtCode)
			if (!curProv) {
				districtMap.set(row.districtCode, { districtCode: row.districtCode, districtName: row.districtName })
			}
		}
		return Array.from(districtMap.values())
	}

	getProvince(search: string, option?: DatabaseSchemaQuery): Province[] {
		const provinceMap = new Map<number, Province>()

		for (const row of this.combineQuery(this.createQueryArray('provinceName', search, option))) {
			let curProv = provinceMap.get(row.provinceCode)
			if (!curProv) {
				provinceMap.set(row.provinceCode, { provinceCode: row.provinceCode, provinceName: row.provinceName })
			}
		}
		return Array.from(provinceMap.values())
	}

	getGeography(option?: DatabaseSchemaQuery): DatabaseSchema[] {
		return this.combineQuery(this.createQueryArray(undefined, '', option))
	}
}
