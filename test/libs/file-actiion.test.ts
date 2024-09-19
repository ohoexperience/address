import { join } from 'path'
import { FileAction } from '../../src/libs/file-actiion'

describe('FileAction', () => {
	const file = new FileAction()
	const samplePath = join(process.cwd(), 'a')
	const sampleFile = join(process.cwd(), 'a.txt')
	const fakePath = join(process.cwd(), 'b')
	describe('existing', () => {
		it('File not found', () => {
			expect(file.existing(join(process.cwd(), 'a.txt'))).toBeFalsy()
		})
		it('File found', () => {
			expect(file.existing(join(process.cwd(), 'package.json'))).toBeTruthy()
		})
	})

	describe('readFile', () => {
		it('Read file success', () => {
			const found = file.readFile(join(process.cwd(), 'package.json'), 'utf-8')
			expect(found).toBeTruthy()
		})

		it('Throw error when file not found', () => {
			try {
				file.readFile(join(process.cwd(), 'a.json'), 'utf-8')
			} catch (e) {
				expect(e).toBeTruthy()
			}
		})
	})

	describe('createDir', () => {
		it('Create dir success', () => {
			file.createDir(samplePath)
			expect(file.existing(samplePath))
		})
	})

	describe('deleteDir', () => {
		it('Delete dir success', () => {
			expect(file.deleteDir(samplePath)).toBeTruthy()
		})

		it('Nothing happen when delete not existing dir', () => {
			expect(file.deleteDir(fakePath)).toBeFalsy()
		})
	})

	describe('writeFile', () => {
		it('Write file success', () => {
			file.writeFile(sampleFile, 'a')
			expect(file.existing(sampleFile))
		})
	})

	describe('deleteFile', () => {
		it('Delete file success', () => {
			expect(file.deleteFile(sampleFile)).toBeTruthy()
		})

		it('Nothing happen when delete not existing file', () => {
			expect(file.deleteFile(fakePath)).toBeFalsy()
		})
	})
})
