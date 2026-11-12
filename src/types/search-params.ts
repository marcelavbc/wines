export type SearchParams = Promise<{
	[key: string]: string | string[] | undefined;
}>;

export type SearchParamsProps = {
	searchParams: SearchParams;
};
