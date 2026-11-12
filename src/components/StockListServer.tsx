import Form from "next/form";
import { Props } from "@/app/server/page";
import { supabase } from "@/lib/supabase";
import { WINE_TYPES } from "@/lib/wine-types";
import WineTypeSelect from "./WineTypeSelect";

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
			<Form action="/server">
				<input
					type="text"
					name="q"
					placeholder="Search..."
					defaultValue={search}
				/>
				<button type="submit">Search</button>
				<WineTypeSelect defaultValue={wineType} />
			</Form>

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
