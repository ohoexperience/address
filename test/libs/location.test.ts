import { Location } from '../../src/libs/location'

describe('Location', () => {
	const loc = new Location()

	describe('exucute', () => {
		const geo = loc.getGeography()
		it('get geo response', () => {
			expect(geo).toHaveLength(7436)
			expect(geo[0]).toEqual({
				districtCode: 1001,
				districtName: 'พระนคร',
				postalCode: 10200,
				provinceCode: 10,
				provinceName: 'กรุงเทพมหานคร',
				subdistrictCode: 100101,
				subdistrictName: 'พระบรมมหาราชวัง',
			})
		})

		it('get geo with query', () => {
			expect(
				loc.getGeography({
					postalCode: 10200,
					provinceCode: 10,
					districtCode: 1001,
					subdistrictCode: 100101,
				})[0],
			).toEqual({
				districtCode: 1001,
				districtName: 'พระนคร',
				postalCode: 10200,
				provinceCode: 10,
				provinceName: 'กรุงเทพมหานคร',
				subdistrictCode: 100101,
				subdistrictName: 'พระบรมมหาราชวัง',
			})
		})

		it('search start with word', () => {
			expect(loc.getProvince('กร')).toEqual([
				{
					provinceCode: 10,
					provinceName: 'กรุงเทพมหานคร',
				},
				{
					provinceCode: 81,
					provinceName: 'กระบี่',
				},
			])
		})

		it('query with properties', () => {
			expect(loc.getProvince('', { postalCode: 10260 })).toEqual([
				{
					provinceCode: 10,
					provinceName: 'กรุงเทพมหานคร',
				},
			])
			expect(loc.getDistrict('', { postalCode: 10260 })).toEqual([
				{
					districtCode: 1009,
					districtName: 'พระโขนง',
				},
				{
					districtCode: 1047,
					districtName: 'บางนา',
				},
			])
			expect(loc.getSubdistrict('', { postalCode: 10260 })).toEqual([
				{
					subdistrictCode: 100905,
					subdistrictName: 'บางจาก',
				},
				{
					subdistrictCode: 100910,
					subdistrictName: 'พระโขนงใต้',
				},
				{
					subdistrictCode: 104702,
					subdistrictName: 'บางนาเหนือ',
				},
				{
					subdistrictCode: 104703,
					subdistrictName: 'บางนาใต้',
				},
			])
			expect(loc.getPostalCode('', { postalCode: 10260 })).toEqual([
				{
					postalCode: 10260,
				},
			])
		})
	})
})
