# CHANGELOG

## v5.5.0 - 2024.08.27 14
* deps: bump up dependencies
* chore: improve develop environments


## v5.4.2 - 2024.07.24 10
* feat(Hades): export new `Hades` subclasses `Melinoe` and `Zagreus`
* docs: update `README.md` about changes of `i18n` and `log (hades)`
* docs: update types about export new `Hades` subclasses 


## v5.4.1 - 2024.07.23 19
* deps(log): bump up `@nuogz/hades` to `7.0.2`


## v5.4.0 - 2024.07.23 10
* feat(log): support for passing all the latest options to `@nuogz/hades`
* deps(log)!: bump up `@nuogz/hades` to `7.0.0`
* refactor(i18n): update codes according to break changes in latest version of `@nuogz/i18n`
* deps: bump up dependencies
* refactor: the unsplited raw params will be set into `launcher.params[key].raw`


## v5.3.1 - 2024.07.16 16
* deps: bump up `@nuogz/hades` to `6.3.1`


## v5.3.0 - 2024.07.16 14
* deps!: bump up `@nuogz/hades` to `6.3.0`


## v5.2.1 - 2024.07.13 16
* deps: bump up dependencies


## v5.2.0 - 2024.07.08 14
* fix: fix declaration export wrong type with util `Day`
* style: use new declaration struct
* style: tweak some code styles
* docs: improve the usage declare codes
* chore: use `tsconfig.json` instead of `jsconfig.json`
* chore: use `@nuogz/common-eslint-config` eslint config
* chore: update `pacakge.json`
* deps: bump up dependencies


## v5.1.4 - 2024.04.30 11
* util `dir`: Fixed logic bug when replacing `<entry>` where `process.argv[1]` was a directory 
* bump up dependencies


## v5.1.3 - 2024.03.06 01
* improve the logic of exporting utils
  * to ensure that utils initialised by other utils can also be exported


## v5.1.2 - 2024.03.06 01
* move `i18n` from util folder to `index.js`, for higher and more proper initialisation priority


## v5.1.1 - 2024.03.06 01
* bump up `@nuogz/poseidon` to `v8.2.0`
  * export `PoseidonInterface` from `@nuogz/poseidon` for extendable `d.ts`


## v5.1.0 - 2024.03.04 10
* (new) utils that have already been inited will be exported now by default


## v5.0.0 - 2024.02.26 11
* (new)(break) HUGE refactor! See full usages on [REAME](README.md)


## v4.3.1 - 2024.02.11 16
* (new) Current Working Directory is now the default for `dirPackage`


## v4.3.0 - 2024.02.11 16
* (new) can pass environment parameters via `import.meta.url` now
* bump up dependencies


## v4.2.0 - 2023.12.07 14
* bump up `commander` to `v11.x`
* tweak enviroment
* bump up dependencies


## v4.1.0 - 2023.06.01 10
* (new) `command` support for preprocessing custom commands via the `process.preloadCommand` function


## v4.0.2 - 2023.06.01 10
* fix peerDependencies bug
* bump up dependencies
* use eslint flat config, and related config udpate
  * use `eslint.config.js` instead `eslintrc.cjs`


## v4.0.1 - 2023.05.09 19
* fix `package.json`


## v4.0.0 - 2023.05.09 18
* (break) use `day.js` instead `moment.js`
* add `d.ts` and renew related code
* bump up dependencies


## v3.1.2 - 2022.09.05 10
* fix typo code


## v3.1.0 - 2022.09.05 10
* improve the priorities of `logger` configs


## v3.0.4 - 2022.09.02 18
* fix bug when export `Commander`


## v3.0.3 - 2022.09.02 18
* fix bug when init `config` params
* improve slots


## v3.0.2 - 2022.09.02 18
* fix slots case


## v3.0.1 - 2022.09.02 18
* export `Commander`


## v3.0.0 - 2022.09.02 17
* rename environment variable `NENV_PANGU` from `NENV_NODE_FUNC`
* improve codes when parse `NENV_PANGU`
* fix codes and remove unused codes
* split runtime part from `@nuogz/pangu@2`
* reset `CHANGLOG.md` since version `v3.0.0`
