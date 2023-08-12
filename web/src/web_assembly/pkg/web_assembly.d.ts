/* tslint:disable */
/* eslint-disable */
/**
 * @param {(string)[]} crate_names
 * @param {string} crate_download_data_results
 * @returns {any}
 */
export function uniform_data(crate_names: string[], crate_download_data_results: string): any;
/**
 * @param {(string)[]} input
 * @returns {(string)[]}
 */
export function test_array(input: string[]): string[];
/**
 * @param {number} left
 * @param {number} right
 * @returns {number}
 */
export function add(left: number, right: number): number;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly uniform_data: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly test_array: (a: number, b: number, c: number) => void;
  readonly add: (a: number, b: number) => number;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
 * Instantiates the given `module`, which can either be bytes or
 * a precompiled `WebAssembly.Module`.
 *
 * @param {SyncInitInput} module
 *
 * @returns {InitOutput}
 */
export function initSync(module: SyncInitInput): InitOutput;

/**
 * If `module_or_path` is {RequestInfo} or {URL}, makes a request and
 * for everything else, calls `WebAssembly.instantiate` directly.
 *
 * @param {InitInput | Promise<InitInput>} module_or_path
 *
 * @returns {Promise<InitOutput>}
 */
export default function __wbg_init(module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
