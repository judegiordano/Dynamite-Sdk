import { v4 } from "uuid";

export const uuid = () => v4();

/**
 *
 * @export
 * @template T
 * @param {T} object
 * @param {string[]} keys
 * @return {*}  {T}
 * ---
 * maps
 * ```
 * ['key_name1', 'key_name2']
 * ```
 * ->
 * ```
 * {
 * ':key_name1': object[key_name1],
 * ':key_name2': object[key_name2]
 * }
 * ```
 */
export function reduceKeyValues<T>(object: T, keys: string[]): T {
	return keys.map(a => `:${a}`).reduce((acc, key) => {
		acc[key] = object[key.replace(":", "") as keyof T];
		return acc;
	}, {} as any);
}

/**
 *
 * @export
 * @param {string[]} keys
 * @return {*}  {{ [key: string]: string }}
 * ---
 * maps
 * ```
 * ['key_name1', 'key_name2']
 * ```
 * ->
 * ```
 * {
 * '#key_name1': 'key_name1',
 * '#key_name2': 'key_name2'
 * }
 * ``` */
export function reduceKeyNames(keys: string[]): { [key: string]: string } {
	return keys.map(a => `#${a}`).reduce((acc, key) => {
		acc[key] = key.replace("#", "");
		return acc;
	}, {} as { [key: string]: string });
}

/**
 *
 * @export
 * @param {string[]} keys
 * @return {*}  {string}
 * ---
 * maps
 * ```
 * ['key_name1', 'key_name2']
 * ```
 * ->
 * ```
 * '#key_name1 = :key_name1 and #key_name2 = :key_name2'
 * ```
 */
export function mapExpression(keys: string[]): string {
	return keys.map(a => `#${a} = :${a}`).join(" and ");
}
