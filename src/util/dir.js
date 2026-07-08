import { statSync } from 'fs';
import { dirname, parse, resolve } from 'path';
import { fileURLToPath } from 'url';




export default function init(launcher, environment, $pangu) {
	let dir =
		launcher.params.default?.[0] ||
		process.env.NENV_PANGU_DIR ||
		process.cwd();

	const entryRaw = process.argv[1];

	dir = dir
		.replace(/(?<!\\)<entry(?<!\\)>/g, statSync(entryRaw).isFile() ? parse(entryRaw).dir : resolve(entryRaw))
		.replace(/\\([<>])/g, '$1')
		.replace(/(?<!\\)<cwd(?<!\\)>/g, process.cwd()).replace(/\\([<>])/g, '$1');

	if(dir?.startsWith('file:')) { dir = dirname(fileURLToPath(dir)); }

	dir = resolve(dir);


	environment.dir = dir;


	return dir;
}
