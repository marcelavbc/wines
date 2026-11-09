"use client";
import { useEffect, useState } from "react";
import type { Tables } from "@/lib/database.types";
import { supabase } from "@/lib/supabase";

type WineStock = Tables<"wine_stock">;
type WinesState =
	| { status: "loading" }
	| { status: "error"; message: string }
	| { status: "success"; wines: WineStock[] };

export function StockList() {
	const [state, setState] = useState<WinesState>({ status: "loading" });

	useEffect(() => {
		let ignore = false;

		async function load() {
			const { data, error } = await supabase.from("wine_stock").select();
			if (ignore) return;
			if (error) {
				setState({
					status: "error",
					message: "No ha sido posible cargar los vinos. Inténtalo más tarde",
				});
				console.error(error);
			} else {
				setState({ status: "success", wines: data });
			}
		}
		load();
		return () => {
			ignore = true;
		};
	}, []);

	switch (state.status) {
		case "loading":
			return <p>Cargando...</p>;
		case "error":
			return <p>Error: {state.message}</p>;
		case "success":
			if (state.wines.length === 0) {
				return <p>Tu bodega está vacía. Añade tu primera botella.</p>;
			}
			return (
				<ul>
					{state.wines.map((stock) => (
						<li
							key={`wine-${stock.wine_id}-${stock.location_id}`}
						>{`${stock.wine_name} - ${stock.location_name}, ${stock.bottles} botellas`}</li>
					))}
				</ul>
			);
	}
}
