create view wine_stock
with (security_invoker = true) as
select wine_id, location_id, sum(delta)::int as bottles
from (
  -- paso 2a: lo que tiene destino, suma allí
  select wine_id, to_location_id as location_id, quantity as delta
  from movements where to_location_id is not null
  union all
  -- paso 2b: lo que tiene origen, resta allí
  select wine_id, from_location_id, -quantity
  from movements where from_location_id is not null
) as deltas
-- paso 3: agrupar por vino y ubicación, y sumar
group by wine_id, location_id
having sum(delta) > 0;