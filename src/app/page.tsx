import { Suspense } from "react";
import StockList from "@/components/StockList";
import type { SearchParamsProps } from "@/types/search-params";

export default function Home({ searchParams }: SearchParamsProps) {
	return (
		<div>
			<Suspense fallback={<p>Loading...</p>}>
				<StockList searchParams={searchParams} />
			</Suspense>
		</div>
	);
}
