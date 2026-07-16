import type Day from 'dayjs';
import type { Hades, Melinoe, Zagreus } from '@danor-lib/hades';
import type { Poseidon } from '@danor-lib/poseidon';



export function splitEscape(string: string, splitter: string): string[];


declare const dirnDefault: string;
declare const dirns$alias: Record<string, string>;
declare const packageDefault: object;
declare const packages$alias: Record<string, object>;
declare const configDefault: Poseidon;
declare const configs$alias: Record<string, Poseidon>;
declare const logDefault: Hades;
declare const logDefaultSub: Hades | Console;
declare const logs$alias: Record<string, Hades>;
declare const processDefault: NodeJS.Process;
declare const DayDefault: typeof Day;
declare const PoseidonDefault: Poseidon;
declare const HadesDefault: Hades;
declare const MelinoeDefault: Melinoe;
declare const ZagreusDefault: Zagreus;



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
