/** @import { UtilIniter } from '../../types.ts' */



/** @type {UtilIniter<NodeJS.Process>} */
export const init = (launcher, environment, $pangu) => {
	const { package: PKG, log = globalThis.console } = environment;


	let textsEnv;
	try {
		textsEnv = process.env.DR_PANGU_TEXTS ? JSON.parse(process.env.DR_PANGU_TEXTS) : null;
	}
	catch {
		textsEnv = null;
	}

	$pangu.texts.process = textsEnv != null ? textsEnv : {
		'process': '进程',
		'unhandledRejection': '未处理的拒绝',
		'unhandledAsyncRejection': '未处理的异步拒绝',
	};


	process.title = PKG.name;

	process.on('unhandledRejection', (error, promise) => {
		log?.fatal($pangu.texts.process.process,
			promise
				? $pangu.texts.process.unhandledAsyncRejection
				: $pangu.texts.process.unhandledRejection,
			error,
		);
	});


	return process;
};
