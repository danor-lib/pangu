import { parse as parsePath, resolve as resolvePath } from 'node:path';

import { Hades } from '@danor-lib/hades';

/** @import { UtilIniter } from '../../types.ts' */



const parseEnvironmentFlag = string =>
	string == 'true' ? true
		: string == 'false' ? false :
			string === '' ? undefined : string;


/** @type {UtilIniter<Hades>} */
export const init = (launcher, environment, $pangu) => {
	const { dirn: dirnWorking, package: PKG, config } = environment;

	const params = launcher.params ?? {};


	const G = new Hades(Object.assign({},
		JSON.parse(JSON.stringify(config?.log ?? {})),
		{
			name: params.name?.raw || params.default?.[0] || PKG.name,
			level: params.level?.raw || params.default?.[1],
			dirn: resolvePath(
				params.dirn?.raw
					?.replace(/(?<!\\)<entry(?<!\\)>/g, parsePath(process.argv[1]).dirn).replace(/\\([<>])/g, '$1')
					?.replace(/(?<!\\)<cwd(?<!\\)>/g, process.cwd()).replace(/\\([<>])/g, '$1')
				|| resolvePath(dirnWorking, 'log'),
			),

			eol: params.eol?.raw,
			templateTime: params.templateTime?.raw,
			sizeFileLogMax: params.sizeFileLogMax?.raw,
			numberFileLogBackupMax: params.numberFileLogBackupMax?.raw,

			willHighlight: parseEnvironmentFlag(params.willHighlight?.raw),
			willColorfulLevel: parseEnvironmentFlag(params.willColorfulLevel?.raw),
			willOutputInitInfo: parseEnvironmentFlag(params.willOutputInitInfo?.raw),
			willConsoleOutputError: parseEnvironmentFlag(params.willConsoleOutputError?.raw),
			willInitImmediate: parseEnvironmentFlag(params.willInitImmediate?.raw),
		}
	));


	return G;
};
