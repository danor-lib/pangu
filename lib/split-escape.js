/**
 * @param {string} string
 * @param {string} splitter
 * @returns {string[]}
 */
export default function splitEscap(string, splitter) {
	return string
		.split(RegExp(`(?<!\\\\)${splitter}`))
		.map(str => str.trim().replace(RegExp(`\\\\${splitter}`, 'g'), ','));
}
