import * as migration_20250406_100942_init_schema from './20250406_100942_init_schema';
import * as migration_20250407_162120 from './20250407_162120';

export const migrations = [
  {
    up: migration_20250406_100942_init_schema.up,
    down: migration_20250406_100942_init_schema.down,
    name: '20250406_100942_init_schema',
  },
  {
    up: migration_20250407_162120.up,
    down: migration_20250407_162120.down,
    name: '20250407_162120'
  },
];
