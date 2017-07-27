........................... Migrations (mongoose-migration )...............................
Init migration:
    migrate init
Create a migration:
    migrate create <description>
Note: To load a mongoose model defined on your configuration file you should call this.model(<model name>)
Perform Migration:
    migrate
    or
    migrate up [number of migrations to perform]
    
Note: By default migrate will execute all migrations created until now. However migrate up will only execute one migration.
    
Rollback Migration:
        migrate down
        or
        migrate down [number of migrations to rollback]
Note: if 'migrate' command doesn't found please use below line before each command instead of 'migrate' word.
c
For example:
./node_modules/mongoose-migration/bin/migrate.js  init

Or install this module globally.
        
........................... Seeder (mongoose-data-seed) .....................................
Init seeder:
    md-seed init
Generate seeder file:
    md-seed g users
Run all seeders:
    md-seed run
Or run specific seeders:
    md-seed run users posts comments

Note: if 'md-seed' command doesn't found please install this module globally.