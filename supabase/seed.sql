-- Seed de desarrollo: Celler Can Paio
-- Deja la base de datos en un estado conocido. Se puede ejecutar tantas veces como quieras.
-- Todo el stock está en una sola ubicación: "Bodega".

-- 0. Vaciar todo y reiniciar los ids
truncate table movements, wines, locations restart identity cascade;

-- 1. Ubicación única
insert into locations (name) values ('Bodega');

-- 2. Vinos
insert into wines (name, vintage, type, price, producer, region, grape) values
  ('Pago de Carraovejas',        2019, 'tinto',    45.50, 'Pago de Carraovejas', 'Ribera del Duero', 'Tempranillo'),
  ('Gramona Cava',               null, 'espumoso', 18.00, 'Gramona',             'Penedès',          'Xarel·lo, Macabeo'),
  ('Pazo Señoráns Albariño',     2023, 'blanco',   14.50, 'Pazo de Señoráns',    'Rías Baixas',      'Albariño'),
  ('Muga Reserva',               2018, 'tinto',    22.00, 'Bodegas Muga',        'Rioja',            'Tempranillo, Garnacha'),
  ('Viña Tondonia Reserva',      2010, 'tinto',    45.00, 'López de Heredia',    'Rioja',            'Tempranillo'),
  ('Chivite Las Fincas Rosado',  2024, 'rosado',   12.00, 'Chivite',             'Navarra',          'Garnacha'),
  ('Tío Pepe',                   null, 'generoso', 11.00, 'González Byass',      'Jerez',            'Palomino');

-- 3. Movimientos (por nombre, sin ids). Entradas a Bodega, salidas desde Bodega.
insert into movements (wine_id, kind, quantity, from_location_id, to_location_id, reason)
select w.id, m.kind, m.qty, f.id, t.id, m.reason
from (values
  -- vino                         tipo   cant  desde     hasta     motivo
  ('Pago de Carraovejas',        'in',  2,    null,     'Bodega', 'Compra'),
  ('Gramona Cava',               'in',  2,    null,     'Bodega', 'Compra'),
  ('Pazo Señoráns Albariño',     'in',  6,    null,     'Bodega', 'Compra'),
  ('Muga Reserva',               'in',  4,    null,     'Bodega', 'Compra'),
  ('Muga Reserva',               'out', 1,    'Bodega', null,     'Regalo'),
  ('Viña Tondonia Reserva',      'in',  1,    null,     'Bodega', 'Regalo'),
  ('Chivite Las Fincas Rosado',  'in',  3,    null,     'Bodega', 'Compra'),
  ('Chivite Las Fincas Rosado',  'out', 1,    'Bodega', null,     'Bebida'),
  ('Tío Pepe',                   'in',  2,    null,     'Bodega', 'Compra')
) as m(wine, kind, qty, from_loc, to_loc, reason)
join wines w on w.name = m.wine
left join locations f on f.name = m.from_loc
left join locations t on t.name = m.to_loc;

-- Resultado esperado: 7 vinos, 18 botellas, una fila por vino en wine_stock.