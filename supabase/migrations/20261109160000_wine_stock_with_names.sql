create or replace view wine_stock
with (security_invoker = true) as
select s.wine_id, s.location_id, s.bottles,
       w.name as wine_name, w.vintage, w.type as wine_type, l.name as location_name
from (
  select wine_id, location_id, sum(delta)::int as bottles
  from (
    select wine_id, to_location_id as location_id, quantity as delta
    from movements where to_location_id is not null
    union all
    select wine_id, from_location_id, -quantity
    from movements where from_location_id is not null
  ) as deltas
  group by wine_id, location_id
  having sum(delta) > 0
) as s
join wines w on w.id = s.wine_id
join locations l on l.id = s.location_id;