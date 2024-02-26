/**
 * @note The block below contains polyfills for Node.js globals
 * required for Jest to function when running JSDOM tests.
 * These HAVE to be require's and HAVE to be in this exact
 * order, since "undici" depends on the "TextEncoder" global API.
 *
 * Consider migrating to a more modern test runner if
 * you don't want to deal with this.
 */

const { TextDecoder, TextEncoder, ReadableStream } = require("node:util");

// Define TextDecoder, TextEncoder, and ReadableStream only if they don't already exist
if (!globalThis.TextDecoder) {
	Object.defineProperty(globalThis, "TextDecoder", {
		value: TextDecoder,
		configurable: true,
		writable: true,
	});
}

if (!globalThis.TextEncoder) {
	Object.defineProperty(globalThis, "TextEncoder", {
		value: TextEncoder,
		configurable: true,
		writable: true,
	});
}

if (!globalThis.ReadableStream) {
	Object.defineProperty(globalThis, "ReadableStream", {
		value: ReadableStream,
		configurable: true,
		writable: true,
	});
}

const { Blob, File } = require("node:buffer");
const { fetch, Headers, FormData, Request, Response } = require("undici");

// Define Blob, File, fetch, Headers, FormData, Request, and Response only if they don't already exist
if (!globalThis.Blob) {
	Object.defineProperty(globalThis, "Blob", {
		value: Blob,
		configurable: true,
		writable: true,
	});
}

if (!globalThis.File) {
	Object.defineProperty(globalThis, "File", {
		value: File,
		configurable: true,
		writable: true,
	});
}

if (!globalThis.fetch) {
	Object.defineProperty(globalThis, "fetch", {
		value: fetch,
		configurable: true,
		writable: true,
	});
}

if (!globalThis.Headers) {
	Object.defineProperty(globalThis, "Headers", {
		value: Headers,
		configurable: true,
		writable: true,
	});
}

if (!globalThis.FormData) {
	Object.defineProperty(globalThis, "FormData", {
		value: FormData,
		configurable: true,
		writable: true,
	});
}

if (!globalThis.Request) {
	Object.defineProperty(globalThis, "Request", {
		value: Request,
		configurable: true,
		writable: true,
	});
}

if (!globalThis.Response) {
	Object.defineProperty(globalThis, "Response", {
		value: Response,
		configurable: true,
		writable: true,
	});
}
