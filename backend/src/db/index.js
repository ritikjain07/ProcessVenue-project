const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

// Database file path
const dbPath = path.resolve(__dirname, '../../../db/profile.db');
const schemaPath = path.resolve(__dirname, '../../../db/schema.sql');
const seedPath = path.resolve(__dirname, '../../../db/seed.sql');

// Create database directory if it doesn't exist
const dbDir = path.dirname(dbPath);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

// Initialize the database
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    initializeDatabase();
  }
});

// Initialize the database with schema and seed data
function initializeDatabase() {
  // Read and execute schema SQL
  const schemaSql = fs.readFileSync(schemaPath, 'utf8');
  
  db.exec(schemaSql, (err) => {
    if (err) {
      console.error('Error initializing database schema:', err.message);
    } else {
      console.log('Database schema initialized successfully');
      
      // Check if we need to seed the database
      db.get('SELECT COUNT(*) as count FROM profile', (err, result) => {
        if (err || result.count === 0) {
          // Seed the database if empty or error (table might not exist)
          const seedSql = fs.readFileSync(seedPath, 'utf8');
          db.exec(seedSql, (seedErr) => {
            if (seedErr) {
              console.error('Error seeding database:', seedErr.message);
            } else {
              console.log('Database seeded successfully');
            }
          });
        } else {
          console.log('Database already contains data, skipping seed');
        }
      });
    }
  });
}

// Helper functions for database operations

// Run a query with parameters and return a promise
function run(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) {
        console.error('Error running query', err.message);
        reject(err);
      } else {
        resolve({ id: this.lastID, changes: this.changes });
      }
    });
  });
}

// Get a single row from the database
function get(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, result) => {
      if (err) {
        console.error('Error getting row', err.message);
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

// Get all rows from the database
function all(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) {
        console.error('Error getting rows', err.message);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

// Close the database
function close() {
  return new Promise((resolve, reject) => {
    db.close((err) => {
      if (err) {
        console.error('Error closing database', err.message);
        reject(err);
      } else {
        console.log('Database connection closed');
        resolve();
      }
    });
  });
}

module.exports = {
  db,
  run,
  get,
  all,
  close
};
