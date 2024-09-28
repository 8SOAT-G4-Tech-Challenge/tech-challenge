function camelToSnakeCase(str: string): string {
	return str.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
}

function snakeToCamelCase(str: string): string {
	return str.replace(/(_\w)/g, (match) => match[1].toUpperCase());
}

export function convertKeysToSnakeCase(obj: any): any {
	if (typeof obj !== 'object' || obj === null) return obj;

	if (Array.isArray(obj)) {
		return obj.map((item) => convertKeysToSnakeCase(item));
	}

	return Object.keys(obj).reduce((acc, key) => {
		const snakeCaseKey = camelToSnakeCase(key);
		acc[snakeCaseKey] = convertKeysToSnakeCase(obj[key]);
		return acc;
	}, {} as any);
}

export function convertKeysToCamelCase(obj: any): any {
	if (typeof obj !== 'object' || obj === null) return obj;

	if (Array.isArray(obj)) {
		return obj.map((item) => convertKeysToCamelCase(item));
	}

	return Object.keys(obj).reduce((acc, key) => {
		const camelCaseKey = snakeToCamelCase(key);
		acc[camelCaseKey] = convertKeysToCamelCase(obj[key]);
		return acc;
	}, {} as any);
}
