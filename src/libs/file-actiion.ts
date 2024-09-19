import { existsSync, mkdirSync, readFileSync, rmdirSync, unlinkSync, writeFileSync } from 'fs'
import { join } from 'path'

export class FileAction {
	private joinPath(paths: string[]) {
		return join(...paths)
	}

	createDir(...paths: string[]) {
		const path = this.joinPath(paths)
		if (!this.existing(path)) {
			return mkdirSync(path)
		}
	}

	existing(path: string) {
		return existsSync(path)
	}

	readFile(path: string | string[], encoding?: BufferEncoding): string {
		const file = readFileSync(this.joinPath(Array.isArray(path) ? path : [path]), encoding)
		return file.toString()
	}

	writeFile(path: string | string[], data: string | Buffer) {
		writeFileSync(this.joinPath(Array.isArray(path) ? path : [path]), data)
	}

	deleteFile(...paths: string[]): boolean {
		const path = this.joinPath(paths)
		if (existsSync(path)) {
			unlinkSync(path)
			return true
		}

		return false
	}

	deleteDir(...paths: string[]): boolean {
		const path = this.joinPath(paths)
		if (existsSync(path)) {
			rmdirSync(path)
			return true
		}

		return false
	}
}
