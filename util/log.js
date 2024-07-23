import { parse, resolve } from 'path';

import { copyJSON } from '@nuogz/utility';
import Hades from '@nuogz/hades';



export default function init(launcher, environment, $pangu) {
	const { dir: dirWorking, package: PKG, config } = environment;


	const parseEnvironmentFlag = string =>
		string == 'true' ? true
			: string == 'false' ? false :
				string === '' ? undefined : string;


	const G = new Hades(Object.assign({},
		copyJSON(config.log ?? {}),
		{
			name: launcher.params.name?.raw || launcher.params.default?.[0] || PKG.name,
			level: launcher.params.level?.raw || launcher.params.default?.[1],
			dirLog: resolve(
				launcher.params.dir?.raw
					?.replace(/(?<!\\)<entry(?<!\\)>/g, parse(process.argv[1]).dir).replace(/\\([<>])/g, '$1')
					?.replace(/(?<!\\)<cwd(?<!\\)>/g, process.cwd()).replace(/\\([<>])/g, '$1') ||
				resolve(dirWorking, 'log')
			),

			eol: launcher.params.eol?.raw,
			templateTime: launcher.params.templatetime?.raw,
			sizeFileLogMax: launcher.params.sizefilelogmax?.raw,
			numberFileLogBackup: launcher.params.numberfilelogbackup?.raw,

			willHighlight: parseEnvironmentFlag(launcher.params.willhighlight?.raw),
			willColorfulLevel: parseEnvironmentFlag(launcher.params.willcolorfullevel?.raw),
			willOutputInitInfo: parseEnvironmentFlag(launcher.params.willoutputinitinfo?.raw),
			willOutputLogDir: parseEnvironmentFlag(launcher.params.willoutputlogdir?.raw),
			willOutputConsoleError: parseEnvironmentFlag(launcher.params.willoutputconsoleerror?.raw),
			willInitImmediate: parseEnvironmentFlag(launcher.params.willinitimmediate?.raw),
		}
	));



	return G;
}
