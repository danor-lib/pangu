import { statSync } from 'node:fs';
import { dirname, parse as parsePath, resolve as resolvePath } from 'node:path';
import { fileURLToPath } from 'node:url';

/** @import { UtilIniter } from '../../types.ts' */



/** @type {UtilIniter<string>} */
export const init = (launcher, environment, $pangu) => {
	let dirn =
		launcher.params.default?.[0] ||
		process.env.NENV_PANGU_DIRN ||
		process.cwd();

	const entryRaw = process.argv[1];

	dirn = dirn
		.replace(/(?<!\\)<entry(?<!\\)>/g, statSync(entryRaw).isFile() ? parsePath(entryRaw).dir : resolvePath(entryRaw))
		.replace(/\\([<>])/g, '$1')
		.replace(/(?<!\\)<cwd(?<!\\)>/g, process.cwd()).replace(/\\([<>])/g, '$1');

	if(dirn?.startsWith('file:')) { dirn = dirname(fileURLToPath(dirn)); }

	dirn = resolvePath(dirn);


	environment.dirn = dirn;


	return dirn;
};
