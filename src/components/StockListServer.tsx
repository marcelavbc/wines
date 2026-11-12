import { Props } from "@/app/server/page";
import { supabase } from "@/lib/supabase";
import { WINE_TYPE_LABELS, WINE_TYPES } from "@/lib/wine-types";

export default async function StockListServer({ searchParams }: Props) {
	const params = await searchParams;

	const search = Array.isArray(params.q) ? params.q[0] : params.q;
	const rawType = Array.isArray(params.type) ? params.type[0] : params.type;
	const wineType = WINE_TYPES.find((type) => type === rawType) ?? null;
	const request = supabase.from("wine_stock").select();
	const searchRequest = search
		? request.ilike("wine_name", `%${search}%`)
		: request;
	const { data, error } = await (wineType
		? searchRequest.eq("wine_type", wineType)
		: searchRequest);

	return (
		<div>
			{error && <p>Error: {error.message}</p>}
			<form>
				<input
					type="text"
					name="q"
					placeholder="Search..."
					defaultValue={search}
				/>
				<button type="submit">Search</button>
				<select name="type" defaultValue={wineType ?? ""}>
					<option value="">Todos</option>
					{WINE_TYPES.map((type) => (
						<option key={type} value={type}>
							{WINE_TYPE_LABELS[type]}
						</option>
					))}
				</select>
			</form>
			{data && (
				<ul>
					{data.map((stock) => (
						<li key={`wine-${stock.wine_id}`}>{`${stock.wine_name}`}</li>
					))}
				</ul>
			)}
		</div>
	);
}
