"use client";
import { WINE_TYPE_LABELS, WINE_TYPES, type WineType } from "@/lib/wine-types";

type Props = {
	defaultValue: WineType | null;
};

export default function WineTypeSelect({ defaultValue }: Props) {
	return (
		<select
			name="type"
			defaultValue={defaultValue ?? ""}
			onChange={(event) => event.currentTarget.form?.requestSubmit()}
		>
			<option value="">Todos</option>
			{WINE_TYPES.map((type) => (
				<option key={type} value={type}>
					{WINE_TYPE_LABELS[type]}
				</option>
			))}
		</select>
	);
}
