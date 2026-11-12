import { Suspense } from "react";
import StockListServer from "@/components/StockListServer";

export type Props = {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function Home({ searchParams }: Props) {
	return (
		<div>
			<h1>Server Page</h1>

			<Suspense fallback={<p>Loading...</p>}>
				<StockListServer searchParams={searchParams} />
			</Suspense>
		</div>
	);
}
