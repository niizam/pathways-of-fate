import pg from 'pg';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const { Pool } = pg;

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'pathways_of_fate',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres_password',
});

async function runMigrations() {
  try {
    console.log('🔄 Starting database migration...');
    console.log(`📦 Database: ${process.env.DB_NAME || 'pathways_of_fate'}`);
    console.log(`🖥️  Host: ${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT || 5432}`);
    
    // Test connection
    await pool.query('SELECT NOW()');
    console.log('✓ Database connection successful');
    
    // Read the SQL file
    const sqlFilePath = join(__dirname, 'db', 'init.sql');
    const sql = readFileSync(sqlFilePath, 'utf8');
    console.log('✓ Migration file loaded');
    
    // Execute the SQL
    await pool.query(sql);
    console.log('✓ Database schema created successfully');
    console.log('✅ Migration completed!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    process.exit(1);
  }
}

runMigrations();
