import { join } from 'path'
import { FileAction } from './file-actiion.js'
import {
	GeographyDTO,
	MinifyDatabase,
	MinifyDistrictDatabase,
	MinifyProvinceDatabase,
	MinifySubDistrictDatabase,
} from './interfaces.js'

export class Repo {
	private file: FileAction
	private dbPath!: string
	private minifyDBPath!: string

	constructor() {
		this.dbPath = join(process.cwd(), 'data', 'geography.json')
		this.minifyDBPath = join(process.cwd(), 'data', 'database.json')
		this.file = new FileAction()
	}

	private deleteDB() {
		try {
			this.file.deleteFile(this.dbPath)
		} catch (e) {
			console.log(e)
		}
	}

	async createDB() {
		const res = await (
			await fetch(
				'https://raw.githubusercontent.com/thailand-geography-data/thailand-geography-json/main/src/geography.json',
			)
		).text()
		this.file.writeFile(this.dbPath, res)
	}

	async updateDB() {
		this.deleteDB()
		await this.createDB()
	}

	getDB() {
		return JSON.parse(this.file.readFile(this.dbPath)) as GeographyDTO[]
	}

	normalizeDB() {
		const db = this.getDB()
		const gruop: {
			[province: string]: {
				[distric: string]: {
					[subDistric: string]: {
						[postalCode: string]: GeographyDTO
					}
				}
			}
		} = {}

		for (const row of db) {
			const provinceCode = row.provinceCode
			const districtCode = row.districtCode
			const subdistrictCode = row.subdistrictCode
			const postalCode = row.postalCode.toString()

			if (!gruop[provinceCode]) {
				gruop[provinceCode] = {}
			}
			if (!gruop[provinceCode][districtCode]) {
				gruop[provinceCode][districtCode] = {}
			}
			if (!gruop[provinceCode][districtCode][subdistrictCode]) {
				gruop[provinceCode][districtCode][subdistrictCode] = {}
			}
			if (!gruop[provinceCode][districtCode][subdistrictCode][postalCode]) {
				gruop[provinceCode][districtCode][subdistrictCode][postalCode] = {} as GeographyDTO
			}

			gruop[provinceCode][districtCode][subdistrictCode][postalCode] = row
		}

		const minify: MinifyDatabase = []
		for (const prov of Object.values(gruop)) {
			let provDB: MinifyProvinceDatabase | undefined
			for (const dis of Object.values(prov)) {
				let disDB: MinifyDistrictDatabase | undefined
				for (const subdis of Object.values(dis)) {
					let subdisDB: MinifySubDistrictDatabase | undefined
					for (const data of Object.values(subdis)) {
						if (!provDB) {
							provDB = [data.provinceNameTh, data.provinceCode, []]
						}
						if (!disDB) {
							disDB = [data.districtNameTh, data.districtCode, []]
						}

						if (!subdisDB) {
							subdisDB = [data.subdistrictNameTh, data.subdistrictCode, []]
						}
						subdisDB[2].push(data.postalCode)
					}
					disDB?.[2].push(subdisDB!)
				}
				provDB?.[2].push(disDB!)
			}
			minify.push(provDB!)
		}

		this.file.writeFile([process.cwd(), 'src', 'libs', 'minifyDB.ts'], `export default ${JSON.stringify(minify)}`)
	}

	getMinifyDb(): MinifyDatabase {
		return JSON.parse(this.file.readFile(this.minifyDBPath)) as MinifyDatabase
	}
}
