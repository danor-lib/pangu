import { readFileSync } from 'node:fs';
import { parse as parsePath, resolve as resolvePath } from 'node:path';

/** @import { UtilIniter } from '../../types.ts' */



/** @param {string} file */
const readPackage = (file) => {
	let PKG;

	try {
		PKG = readFileSync(file, 'utf8');
		PKG = JSON.parse(PKG);
	}
	catch {
		PKG = {};
	}

	return PKG;
};



/** @type {UtilIniter<Object>} */
export const init = (launcher, environment, $pangu) => {
	const dirnPackage = resolvePath(
		(launcher.params?.dirn?.[0] || launcher.params?.default?.[0])
			?.replace(/(?<!\\)<entry(?<!\\)>/g, parsePath(process.argv[1]).dir).replace(/\\([<>])/g, '$1')
			?.replace(/(?<!\\)<cwd(?<!\\)>/g, process.cwd()).replace(/\\([<>])/g, '$1')
		|| environment.dirn,
	);


	const pkg = readPackage(resolvePath(dirnPackage, 'package.json'));


	environment.package = pkg;


	return pkg;
};
