export const WINE_TYPES = [
	"tinto",
	"blanco",
	"rosado",
	"espumoso",
	"generoso",
	"dulce",
	"otro",
] as const;

export type WineType = (typeof WINE_TYPES)[number];
