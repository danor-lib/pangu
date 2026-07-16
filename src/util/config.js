import { parse as parsePath, resolve as resolvePath } from 'node:path';

import { Poseidon } from '@danor-lib/poseidon';

/** @import { UtilIniter } from '../../types.ts' */



/** @type {UtilIniter<Poseidon<any>>} */
export const init = async (launcher, environment, $pangu) => {
	const params = launcher.params ?? {};


	const dirn = resolvePath(
		params.dirn?.[0]
			?.replace(/(?<!\\)<entry(?<!\\)>/g, parsePath(process.argv[1]).dir).replace(/\\([<>])/g, '$1')
			?.replace(/(?<!\\)<cwd(?<!\\)>/g, process.cwd()).replace(/\\([<>])/g, '$1')
		|| resolvePath(environment.dirn, 'config'),
	);


	const isUseJSONC = params.jsonc?.[0];

	let config;
	if(isUseJSONC) {
		const { parse, stringify } = await import('comment-json');

		config = new Poseidon({
			dirn,
			preloads: params.default?.join(','),
			exts: ['.jsonc', '.json'],
			parser: (buffer) => parse(buffer.toString('utf-8')),
			packer: (data) => stringify(data, null, '\t'),
		});
	}
	else {
		config = new Poseidon({
			dirn,
			preloads: params.default?.join(','),
		});
	}


	environment.config = config;


	return config;
};
