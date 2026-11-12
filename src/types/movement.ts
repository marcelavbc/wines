type MovementBase = {
	id: number;
	wineId: number;
	quantity: number;
	createdAt: string;
};

type IncomingMovement = MovementBase & {
	kind: "in";
	toLocationId: number;
	reason: string | null;
};

type OutgoingMovement = MovementBase & {
	kind: "out";
	fromLocationId: number;
	reason: string | null;
};

type TransferMovement = MovementBase & {
	kind: "move";
	fromLocationId: number;
	toLocationId: number;
};

export type Movement = IncomingMovement | OutgoingMovement | TransferMovement;

export function describeMovement(movement: Movement): string {
	switch (movement.kind) {
		case "in":
			return `Incoming movement of ${movement.quantity} units to location ${movement.toLocationId}`;
		case "out":
			return `Outgoing movement of ${movement.quantity} units from location ${movement.fromLocationId}`;
		case "move":
			return `Transfer movement of ${movement.quantity} units from location ${movement.fromLocationId} to location ${movement.toLocationId}`;
		default:
			const unreachable: never = movement;
			return unreachable;
	}
}
