"use client";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import type { Tables } from "@/lib/database.types";
import { supabase } from "@/lib/supabase";
import { WINE_TYPE_LABELS, WINE_TYPES, type WineType } from "@/lib/wine-types";

type WineStock = Tables<"wine_stock">;
type WinesState =
	| { status: "loading" }
	| { status: "error"; message: string }
	| { status: "success"; wines: WineStock[]; query: string };

export function StockList() {
	const [state, setState] = useState<WinesState>({ status: "loading" });
	const [selectedType, setSelectedType] = useState<WineType | null>(null);
	const [searchQuery, setSearchQuery] = useState<string>("");
	const debouncedQuery = useDebounce(searchQuery, 400);

	useEffect(() => {
		const controller = new AbortController();

		async function load() {
			const { data, error } = await supabase
				.from("wine_stock")
				.select()
				.ilike("wine_name", `%${debouncedQuery}%`)
				.abortSignal(controller.signal);
			if (controller.signal.aborted) return;
			if (error) {
				setState({
					status: "error",
					message: "No ha sido posible cargar los vinos. Inténtalo más tarde",
				});
				console.error(error);
			} else {
				setState({ status: "success", wines: data, query: debouncedQuery });
			}
		}
		load();
		return () => {
			controller.abort();
		};
	}, [debouncedQuery]);

	function renderResults() {
		switch (state.status) {
			case "loading":
				return <p>Cargando...</p>;
			case "error":
				return <p>Error: {state.message}</p>;
			case "success": {
				const filteredWines = selectedType
					? state.wines.filter((stock) => stock.wine_type === selectedType)
					: state.wines;

				if (state.wines.length === 0) {
					return state.query !== "" ? (
						<p>No hay vinos que coincidan con tu búsqueda.</p>
					) : (
						<p>Tu bodega está vacía. Añade tu primera botella.</p>
					);
				}

				return (
					<>
						{filteredWines.length === 0 && (
							<p>No hay vinos de este tipo en tu bodega.</p>
						)}
						<ul>
							{filteredWines.map((stock) => (
								<li
									key={`wine-${stock.wine_id}`}
								>{`${stock.wine_name} - ${stock.bottles} botellas`}</li>
							))}
						</ul>
					</>
				);
			}
		}
	}

	return (
		<>
			<input
				type="search"
				placeholder="Buscar vino..."
				value={searchQuery}
				onChange={(e) => setSearchQuery(e.target.value)}
			/>
			<select
				value={selectedType ?? ""}
				onChange={(e) =>
					setSelectedType(
						WINE_TYPES.find((type) => type === e.target.value) ?? null,
					)
				}
			>
				<option value="">Todos</option>
				{WINE_TYPES.map((type) => (
					<option key={type} value={type}>
						{WINE_TYPE_LABELS[type]}
					</option>
				))}
			</select>
			{renderResults()}
		</>
	);
}
