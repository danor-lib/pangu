/** @import Day from 'dayjs' */
/** @import { Poseidon } from '@danor-lib/poseidon' */
/** @import { Hades, Melinoe, Zagreus } from '@danor-lib/hades' */
/** @import { Environment, Launcher, ScopedSub } from './types.ts' */



if('$pangu' in globalThis == false) {
	globalThis.$pangu = {
		utils$short: {
			dir: 'dirn',
			dirn: 'dirn',
			pkg: 'package',
			package: 'package',
			cfg: 'config',
			conf: 'config',
			config: 'config',
			log: 'log',
			logger: 'log',
			proc: 'process',
			process: 'process',
			day: 'day',
			poseidon: 'poseidon',
			hades: 'hades',
		},
		orders$util: {
			dirn: 1,
			package: 2,
			config: 3,
			log: 4,
			process: 5,
			day: 99,
			poseidon: 99,
			hades: 99,
		},
		subs$urlImport: {},
		utils$name: {},
		utilsExport: {
			dirnDefault: void 0,
			dirns$alias: {},
			packageDefault: void 0,
			packages$alias: {},
			configDefault: void 0,
			configs$alias: {},
			logDefault: void 0,
			logDefaultSub: globalThis.console,
			logs$alias: {},

			processDefault: void 0,
			DayDefault: void 0,
			PoseidonDefault: void 0,
			HadesDefault: void 0,
			MelinoeDefault: void 0,
			ZagreusDefault: void 0,
		},
		promisesWait: [],
		texts: {},
	};
}
const $pangu = globalThis.$pangu;


const urlImport = import.meta.url;


const { utils$name, orders$util, utils$short, utilsExport } = $pangu;
/** @type {ScopedSub} */
const subScoped = $pangu.subs$urlImport[urlImport] = {
	launchers$name: {},
	environments$space: {},
};

const environments$space = subScoped.environments$space;
const launchers$name = subScoped.launchers$name;


/**
 * @param {string} string
 * @param {string} splitter
 * @returns {string[]}
 */
export const splitEscape = (string, splitter) => string
	.split(RegExp(`(?<!\\\\)${splitter}`))
	.map(str => str.trim().replace(RegExp(`\\\\${splitter}`, 'g'), ','));



const parseParamString = string => {
	for(let [shortRaw, paramsRaw = ''] of [...new URL(string).searchParams.entries()]) {
		const optional = shortRaw[0] == '?';

		if(optional) { shortRaw = shortRaw.slice(1); }
		shortRaw = shortRaw.toLowerCase();


		const [shortRaw2, keyParamNamed = ''] = splitEscape(shortRaw, '\\.');
		const [short, alias = '', space = ''] = splitEscape(shortRaw2, ':');

		const util = utils$short[short] ?? short;
		const name = `${util}${alias ? `:${alias}` : ''}`;


		const launcher = name in launchers$name ? launchers$name[name] : (launchers$name[name] = {
			name, util, alias, space,
			enabled: false,
			params: {},
		});


		if(!keyParamNamed.trim() && !optional) { launcher.enabled = true; }

		launcher.params[keyParamNamed.trim() || 'default'] = splitEscape(paramsRaw, ',');
		launcher.params[keyParamNamed.trim() || 'default'].raw = paramsRaw;
	}
};

parseParamString(`https://world.peace?${process.env.NENV_PANGU ?? ''}`);
parseParamString(import.meta.url);



const exportUtil = (util, launcher, utilsSub) => {
	if(launcher.util == 'dirn') {
		utilsExport.dirns$alias[launcher.alias] = util;

		if(launcher.alias == '') { utilsExport.dirnDefault = util; }
	}
	else if(launcher.util == 'package') {
		utilsExport.packages$alias[launcher.alias] = util;

		if(launcher.alias == '') { utilsExport.packageDefault = util; }
	}
	else if(launcher.util == 'config') {
		utilsExport.configs$alias[launcher.alias] = util;

		if(launcher.alias == '') { utilsExport.configDefault = util; }
	}
	else if(launcher.util == 'log') {
		utilsExport.logs$alias[launcher.alias] = util;

		if(launcher.alias == '') { utilsExport.logDefault = util; utilsExport.logDefaultSub = util; }
	}

	else if(launcher.util == 'process') { utilsExport.processDefault = util; }
	else if(launcher.util == 'day') { utilsExport.DayDefault = util; }
	else if(launcher.util == 'poseidon') { utilsExport.PoseidonDefault = util; }
	else if(launcher.util == 'hades') {
		utilsExport.HadesDefault = util;
		utilsExport.MelinoeDefault = utilsSub.Melinoe;
		utilsExport.ZagreusDefault = utilsSub.Zagreus;
	}
};



/**
 * @param {Launcher} launcher
 * @param {Environment} environment
 */
const initUtil = async (launcher, environment) => {
	if(!launcher.enabled) { return; }

	let util;
	const utilsSub = {};
	if(launcher.util == 'dirn') {
		util = (await import('./src/util/dirn.js')).init(launcher, environment, $pangu);
	}
	else if(launcher.util == 'package') {
		if(!environment.$imported.dirn) { await initDefaultUtil('dirn', launcher.space, environment); }

		util = (await import('./src/util/package.js')).init(launcher, environment, $pangu);
	}
	else if(launcher.util == 'config') {
		if(!environment.$imported.dirn) { await initDefaultUtil('dirn', launcher.space, environment); }

		util = await (await import('./src/util/config.js')).init(launcher, environment, $pangu);
	}
	else if(launcher.util == 'log') {
		if(!environment.$imported.dirn) { await initDefaultUtil('dirn', launcher.space, environment); }
		if(!environment.$imported.package) { await initDefaultUtil('package', launcher.space, environment); }
		if(!environment.$imported.config) { await initDefaultUtil('config', launcher.space, environment); }

		util = (await import('./src/util/log.js')).init(launcher, environment, $pangu);
	}

	else if(launcher.util == 'process') {
		if(!environment.$imported.package) { await initDefaultUtil('package', launcher.space, environment); }
		if(!environment.$imported.log) { await initDefaultUtil('log', launcher.space, environment); }

		util = (await import('./src/util/process.js')).init(launcher, environment, $pangu);
	}
	else if(launcher.util == 'day') {
		util = (await import('./src/util/day.js')).init(launcher, environment, $pangu);
	}

	else if(launcher.util == 'poseidon') {
		util = environment.$imported[launcher.util] ? environment.Poseidon : (environment.Poseidon = (await import('@danor-lib/poseidon')).Poseidon);
	}
	else if(launcher.util == 'hades') {
		const module = await import('@danor-lib/hades');

		util = environment.$imported[launcher.util] ? environment.Hades : (environment.Hades = module.default);

		utilsSub.Melinoe = environment.$imported[launcher.util] ? environment.Melinoe : (environment.Melinoe = module.Melinoe);
		utilsSub.Zagreus = environment.$imported[launcher.util] ? environment.Zagreus : (environment.Zagreus = module.Zagreus);
	}


	if(util) {
		environment.$imported[launcher.util] = true;

		exportUtil(util, launcher, utilsSub);
	}


	return util;
};
/**
 * @param {string} util
 * @param {Launcher['space']} space
 * @param {Environment} environment
 */
const initDefaultUtil = async (util, space, environment) => {
	const launcher = util in launchers$name ? launchers$name[util] : (launchers$name[util] = {
		name: util, util, alias: '', space,
		enabled: false,
		params: {},
	});

	launcher.enabled = true;

	return initUtil(launcher, environment);
};


const promisesWait = $pangu.promisesWait;
for(const launcher of Object.values(launchers$name).sort(({ util: a }, { util: b }) => (orders$util[a] ?? 9999) - (orders$util[b] ?? 9999))) {
	const environment = environments$space[launcher.space] ?? (environments$space[launcher.space] = { $imported: {} });


	const util = utils$name[launcher.name];

	if(!util) {
		promisesWait.push(
			utils$name[launcher.name] = initUtil(launcher, environment)
				.then(utilWaited => utils$name[launcher.name] = utilWaited)
		);
	}
	else if(util instanceof Promise) {
		promisesWait.push(util);
	}
}

await Promise.all(promisesWait);



/** @type {string} */
const dirnDefault = utilsExport.dirnDefault;
/** @type {Record<string, string>} */
const dirns$alias = utilsExport.dirns$alias;
/** @type {Object} */
const packageDefault = utilsExport.packageDefault;
/** @type {Record<string, Object>} */
const packages$alias = utilsExport.packages$alias;
/** @type {Poseidon} */
const configDefault = utilsExport.configDefault;
/** @type {Record<string, Poseidon>} */
const configs$alias = utilsExport.configs$alias;
/** @type {Hades} */
const logDefault = utilsExport.logDefault;
/** @type {Hades | globalThis['console']} */
const logDefaultSub = utilsExport.logDefaultSub;
/** @type {Record<string, Hades>} */
const logs$alias = utilsExport.logs$alias;

/** @type {globalThis['process']} */
const processDefault = utilsExport.processDefault;
/** @type {Day} */
const DayDefault = utilsExport.DayDefault;
/** @type {Poseidon} */
const PoseidonDefault = utilsExport.PoseidonDefault;
/** @type {Hades} */
const HadesDefault = utilsExport.HadesDefault;
/** @type {Melinoe} */
const MelinoeDefault = utilsExport.MelinoeDefault;
/** @type {Zagreus} */
const ZagreusDefault = utilsExport.ZagreusDefault;



export {
	dirnDefault as dirnWorking,
	dirns$alias as dirnsWorking,
	packageDefault as PKG,
	packages$alias as packages,

	configDefault as C,
	configs$alias as configs,
	logDefault as G,
	logDefaultSub as GG,
	logs$alias as logs,

	processDefault as process,
	DayDefault as Day,
	PoseidonDefault as Poseidon,
	HadesDefault as Hades,
	MelinoeDefault as Melinoe,
	ZagreusDefault as Zagreus,
};
