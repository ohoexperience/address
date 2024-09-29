import { Location } from '../../src/libs/location'

describe('Location', () => {
	const loc = new Location()
	test('execute', () => {
		const res = loc.execute({
			postalCode: 10270,
			subDistrictName: 'ปากน้ำ',
		})
		expect(res).toStrictEqual([
			{
				districtCode: 1101,
				districtName: 'เมืองสมุทรปราการ',
				postalCode: 10270,
				provinceCode: 11,
				provinceName: 'สมุทรปราการ',
				subDistrictCode: 110101,
				subDistrictName: 'ปากน้ำ',
			},
		])

		const res1 = loc.execute(
			{
				provinceName: 'กรุง',
				districtName: 'บางนา',
				subDistrictName: 'บางนาใต้',
			},
			(row) => ({ a: `${row.provinceName} ${row.postalCode}` }),
		)
		expect(res1).toStrictEqual([
			{
				a: 'กรุงเทพมหานคร 10260',
			},
		])

		const res2 = loc.execute(
			{
				provinceName: 'กรุง',
				districtName: 'บางนา',
			},
			(acc, row) => {
				acc.add(row.provinceName)
				return acc
			},
			new Set<string>(),
		)
		expect(Array.from(res2)).toStrictEqual(['กรุงเทพมหานคร'])
	})
})
