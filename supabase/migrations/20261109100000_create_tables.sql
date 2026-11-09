-- Ubicaciones: dónde se guardan las botellas
create table locations (
  id bigint generated always as identity primary key,
  name text not null unique
);

-- Vinos: qué vinos existen (sin cantidades)
create table wines (
  id bigint generated always as identity primary key,
  name text not null,
  vintage smallint,
  type text not null check (type in ('tinto', 'blanco', 'espumoso', 'rosado', 'dulce', 'generoso', 'otro')),
  price numeric(10, 2) check (price >= 0),
  producer text,
  region text,
  grape text,
  created_at timestamptz not null default now(),
  unique nulls not distinct (name, vintage)
);

-- Movimientos: cada entrada, salida o traslado de botellas
create table movements (
  id bigint generated always as identity primary key,
  wine_id bigint not null references wines(id),
  kind text not null check (kind in ('in', 'out', 'move')),
  quantity smallint not null check (quantity > 0),
  from_location_id bigint references locations(id),
  to_location_id bigint references locations(id),
  reason text,
  created_at timestamptz not null default now(),

  -- Coherencia de ubicaciones según el tipo de movimiento
  check (
    (kind = 'in'   and from_location_id is null     and to_location_id is not null) or
    (kind = 'out'  and from_location_id is not null and to_location_id is null) or
    (kind = 'move' and from_location_id is not null and to_location_id is not null
                   and from_location_id <> to_location_id)
  )
);