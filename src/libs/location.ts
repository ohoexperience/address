import { Entries } from 'type-fest'
import {
	ComposisCondition,
	DatabaseSchema,
	DatabaseSchemaQuery,
	MapCallback,
	MinifyDatabase,
	ReduceCallback,
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
					for (const subDistrict of district[2]) {
						for (const postalCode of subDistrict[2]) {
							database.push({
								provinceName: province[0],
								provinceCode: province[1],
								districtName: district[0],
								districtCode: district[1],
								subDistrictName: subDistrict[0],
								subDistrictCode: subDistrict[1],
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

	private createQueryArray(option?: DatabaseSchemaQuery): ComposisCondition<DatabaseSchema>[] {
		const queries: ComposisCondition<DatabaseSchema>[] = []

		if (option) {
			for (const [property, value] of Object.entries(option) as Entries<DatabaseSchemaQuery>) {
				if (!value) {
					continue
				}

				queries.push((row) => {
					if (['provinceCode', 'districtCode', 'subDistrictCode'].includes(property)) {
						return row[property] === value
					} else if (['provinceName', 'districtName', 'subDistrictName'].includes(property)) {
						return row[property].toString().startsWith(value.toString())
					} else if ('postalCode' === property) {
						return row.postalCode.toString().startsWith(value.toString())
					}

					return false
				})
			}
		}

		return queries
	}

	private detectFunction<T>(cb: unknown, init?: unknown): cb is T {
		return typeof cb === 'function'
	}

	execute(option: DatabaseSchemaQuery): DatabaseSchema[]
	execute<Res>(option: DatabaseSchemaQuery, callback: MapCallback<Res>): Res[]
	execute<Init>(option: DatabaseSchemaQuery, callback: ReduceCallback<Init>, init: Init): Init
	execute<Res, Init>(option: DatabaseSchemaQuery, callback?: MapCallback<Res> | ReduceCallback<Init>, init?: Init) {
		const res = this.combineQuery(this.createQueryArray(option))

		if (callback && !init && this.detectFunction<MapCallback<Res>>(callback)) {
			return res.map(callback)
		}

		if (callback && init && this.detectFunction<ReduceCallback<Init>>(callback)) {
			return res.reduce(callback, init)
		}

		return res
	}
}
