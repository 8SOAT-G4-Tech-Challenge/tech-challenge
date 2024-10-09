import * as fs from 'fs';
import * as path from 'path';

import { MultipartFileBuffer } from '@ports/input/products';
import { FileSystemStorage } from '@src/core/application/ports/output/fileSystemStorage';
import logger from '@src/core/common/logger';

export class FileSystemStorageImpl implements FileSystemStorage {
	async saveFile(file: MultipartFileBuffer, productId: string): Promise<string> {
		const uploadDir = path.join(__dirname, `/../../../uploads/${productId}`);
		if (!fs.existsSync(uploadDir)) {
			fs.mkdirSync(uploadDir, { recursive: true });
		}

		const filePath = path.join(uploadDir, file.filename);

		fs.writeFile(filePath, file.buffer, (err) => {
			if (err) {
				logger.error(`Error trying to save file: ${JSON.stringify(filePath)}`);
				return;
			}
			logger.info(`File saved to: ${JSON.stringify(filePath)}`);
		});

		return `/uploads/${productId}/${file.filename}`;
	}

	async deleteFile(filePath: string): Promise<void> {
		const absolutePath = path.join(__dirname, `/../../../${filePath}`);
		if (fs.existsSync(absolutePath)) {
			fs.unlinkSync(absolutePath);
		}
	}

	async deleteDirectory(directoryPath: string): Promise<void> {
		const absolutePath = path.join(__dirname, `/../../../${directoryPath}`);
		if (fs.existsSync(absolutePath)) {
			const files = fs.readdirSync(absolutePath);
			files.forEach((file) => {
				fs.unlinkSync(path.join(absolutePath, file));
			});
			fs.rmdirSync(absolutePath);
		}
	}
}
