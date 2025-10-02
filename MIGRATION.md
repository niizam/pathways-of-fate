# Migration Guide: SQL to JSON Database

## Overview

As of this update, **Pathways of Fate** has migrated from PostgreSQL + Redis to a simple JSON-based database system following the KISS (Keep It Simple, Stupid) principle.

## Why the Change?

- **Simplicity**: No need to set up and maintain PostgreSQL and Redis servers
- **Portability**: JSON files can be easily backed up, versioned, and moved
- **Lower barrier to entry**: Anyone can run the game with just Node.js
- **Self-hosting friendly**: Perfect for small-scale deployments and personal instances
- **Development speed**: Faster iteration without schema migrations

## What Changed

### Removed Dependencies
- ❌ PostgreSQL (`pg` package)
- ❌ Redis (`redis` package)

### New System
- ✅ JSON file-based database in `server/db/data/`
- ✅ In-memory cache for battle states (replaces Redis)
- ✅ Automatic file management and initialization

## For New Users

Nothing special to do! Just run:

```bash
npm install
npm run dev
```

The JSON database will be automatically created on first run.

## For Existing Users

If you have an existing installation with PostgreSQL data:

### Option 1: Fresh Start (Recommended for most users)

1. Pull the latest changes
2. Remove old database dependencies:
   ```bash
   cd server
   rm -rf node_modules
   npm install
   ```
3. Start fresh with the new JSON database:
   ```bash
   npm run dev
   ```

### Option 2: Export and Migrate Your Data

If you want to preserve your existing game data:

1. **Export your PostgreSQL data** to JSON format before updating:
   ```bash
   # Connect to your database
   psql pathways_of_fate
   
   # Export tables (example for users table)
   \copy (SELECT row_to_json(users) FROM users) TO 'users_export.json'
   ```

2. **Pull the latest changes and install**:
   ```bash
   git pull
   cd server
   rm -rf node_modules
   npm install
   ```

3. **Import your data** into the new JSON database:
   - Start the server once to create the JSON files
   - Stop the server
   - Replace the contents of `server/db/data/*.json` with your exported data
   - Ensure the JSON follows the array format: `[{...}, {...}]`
   - Restart the server

### Option 3: Keep Using the Old Version

If you prefer the SQL-based system:

```bash
# Stay on the last SQL version
git checkout <commit-before-json-migration>
```

## Docker Users

The new `docker-compose.yml` no longer includes PostgreSQL and Redis services.

### Update your Docker setup:

```bash
# Stop and remove old containers
docker-compose down -v

# Pull latest changes
git pull

# Start with new simplified setup
docker-compose up -d
```

Data will be stored in `server/db/data/` which is mounted as a volume.

## Performance Considerations

The JSON database is suitable for:
- ✅ Personal instances
- ✅ Small communities (< 1000 active users)
- ✅ Development and testing
- ✅ Self-hosting

For larger deployments, you may want to:
- Keep regular backups of the `server/db/data/` directory
- Monitor file sizes
- Consider implementing database cleanup for old data

## Backup Your Data

Your game data is now in simple JSON files:

```bash
# Backup everything
cp -r server/db/data/ backup-$(date +%Y%m%d)/

# Or use git (if you added data to version control)
git add server/db/data/
git commit -m "Backup game data"
```

## Questions?

If you encounter any issues during migration, please open an issue on GitHub.
