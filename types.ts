import type Day from 'dayjs';
import type { Hades, Melinoe, Zagreus } from '@danor-lib/hades';
import type { Poseidon } from '@danor-lib/poseidon';



/** Launcher parameter value (string array with raw property) */
export type LauncherParams = string[] & { raw: string; };

/** Single util launcher */
export interface Launcher {
	name: string;
	util: string;
	alias: string;
	space: string;
	enabled: boolean;
	params: Record<string, LauncherParams>;
}

/** Environment space */
export interface Environment {
	$imported: Record<string, boolean>;
	[key: string]: any;
}

/** Sub-data under URL scope */
export interface ScopedSub {
	launchers$name: Record<string, Launcher>;
	environments$space: Record<string, Environment>;
}

/** Export util set */
export interface ExportUtils {
	dirnDefault: string | undefined;
	dirns$alias: Record<string, string>;
	packageDefault: object | undefined;
	packages$alias: Record<string, object>;
	configDefault: Poseidon | undefined;
	configs$alias: Record<string, Poseidon>;
	logDefault: Hades | undefined;
	logDefaultSub: Hades | Console;
	logs$alias: Record<string, Hades>;
	processDefault: typeof globalThis.process | undefined;
	DayDefault: typeof Day | undefined;
	PoseidonDefault: Poseidon | undefined;
	HadesDefault: Hades | undefined;
	MelinoeDefault: Melinoe | undefined;
	ZagreusDefault: Zagreus | undefined;
}

/** globalThis.$pangu —— Global Pangu instance */
export interface PanguGlobal {
	/** Util short name mapping */
	utils$short: Record<string, string>;
	/** Util loading priority */
	orders$util: Record<string, number>;
	subs$urlImport: Record<string, ScopedSub>;
	utils$name: Record<string, any>;
	utilsExport: ExportUtils;
	promisesWait: Promise<any>[];
	texts: Record<string, any>;
}



/**
 * Generic Util initializer function —— all util init functions follow this signature
 *
 * @param launcher - Util launcher, initialization parameters can be specified in its `params`
 * @param environment - Environment space object, initialization products are written to its corresponding properties
 * @param $pangu - Global Pangu instance
 */
export type UtilIniter<R = any> = (launcher: Launcher, environment: Environment, $pangu: PanguGlobal) => R | Promise<R>;
