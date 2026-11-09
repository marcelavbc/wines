-- 1. Vinos nuevos
insert into wines (name, vintage, type, price, producer, region, grape) values
  ('Pazo Señoráns Albariño', 2023, 'blanco', 14.50, 'Pazo de Señoráns', 'Rías Baixas', 'Albariño'),
  ('Muga Reserva', 2018, 'tinto', 22.00, 'Bodegas Muga', 'Rioja', 'Tempranillo, Garnacha'),
  ('Viña Tondonia Reserva', 2010, 'tinto', 45.00, 'López de Heredia', 'Rioja', 'Tempranillo'),
  ('Chivite Las Fincas Rosado', 2024, 'rosado', 12.00, 'Chivite', 'Navarra', 'Garnacha'),
  ('Tío Pepe', null, 'generoso', 11.00, 'González Byass', 'Jerez', 'Palomino');

-- 2. Movimientos (por nombre, sin ids)
insert into movements (wine_id, kind, quantity, from_location_id, to_location_id, reason)
select w.id, m.kind, m.qty, f.id, t.id, m.reason
from (values
  -- vino                         tipo    cant  desde       hasta       motivo
  ('Gramona Cava',               'in',   2,    null,       'Nevera 2', 'Compra'),
  ('Pazo Señoráns Albariño',     'in',   6,    null,       'Bodega',   'Compra'),
  ('Pazo Señoráns Albariño',     'move', 2,    'Bodega',   'Nevera 2', 'Traslado'),
  ('Muga Reserva',               'in',   4,    null,       'Bodega',   'Compra'),
  ('Muga Reserva',               'out',  1,    'Bodega',   null,       'Regalo'),
  ('Viña Tondonia Reserva',      'in',   1,    null,       'Bodega',   'Regalo'),
  ('Chivite Las Fincas Rosado',  'in',   3,    null,       'Nevera 1', 'Compra'),
  ('Chivite Las Fincas Rosado',  'out',  1,    'Nevera 1', null,       'Bebida'),
  ('Tío Pepe',                   'in',   2,    null,       'Bodega',   'Compra'),
  ('Pago de Carraovejas',        'move', 1,    'Nevera 1', 'Bodega',   'Traslado')
) as m(wine, kind, qty, from_loc, to_loc, reason)
join wines w on w.name = m.wine
left join locations f on f.name = m.from_loc
left join locations t on t.name = m.to_loc;