export const WINE_TYPES = [
	"tinto",
	"blanco",
	"rosado",
	"espumoso",
	"generoso",
	"dulce",
	"otro",
] as const;

export const WINE_TYPE_LABELS: Record<WineType, string> = {
	tinto: "Tinto",
	blanco: "Blanco",
	rosado: "Rosado",
	espumoso: "Espumoso",
	generoso: "Generoso",
	dulce: "Dulce",
	otro: "Otro",
};

export type WineType = (typeof WINE_TYPES)[number];
