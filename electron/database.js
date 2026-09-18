const fs = require('fs');
const path = require('path');
const { app } = require('electron');
const initSqlJs = require('sql.js');

class GameDatabase {
  constructor() {
    this.db = null;
    this.SQL = null;
    this.userDataPath = (app && typeof app.getPath === 'function')
      ? app.getPath('userData')
      : path.join(process.env.HOME || process.env.USERPROFILE || '.', '.mythic_gm');
    this.dbPath = path.join(this.userDataPath, 'mythic_gm.sqlite');
    this.backupPath = path.join(this.userDataPath, 'mythic_games_backup.json');
  }


  async init() {
    this.SQL = await initSqlJs();

    // Ensure user data directory exists
    if (!fs.existsSync(this.userDataPath)) {
      fs.mkdirSync(this.userDataPath, { recursive: true });
    }

    // Load existing SQLite database file if it exists
    if (fs.existsSync(this.dbPath)) {
      try {
        const fileBuffer = fs.readFileSync(this.dbPath);
        this.db = new this.SQL.Database(fileBuffer);
      } catch (err) {
        console.error('Error loading existing SQLite database, creating fresh one:', err);
        this.db = new this.SQL.Database();
      }
    } else {
      this.db = new this.SQL.Database();
    }

    // Initialize schema
    this.db.run(`
      CREATE TABLE IF NOT EXISTS games (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        chaos INTEGER NOT NULL DEFAULT 5,
        scenes TEXT NOT NULL DEFAULT '[]',
        characters TEXT NOT NULL DEFAULT '[]',
        threads TEXT NOT NULL DEFAULT '[]',
        created_at INTEGER NOT NULL,
        updated_at INTEGER NOT NULL
      );
    `);

    // If database was empty, check if we have a json backup to restore from
    const countRes = this.db.exec("SELECT COUNT(*) as count FROM games;");
    const count = countRes.length > 0 && countRes[0].values[0] ? countRes[0].values[0][0] : 0;
    if (count === 0 && fs.existsSync(this.backupPath)) {
      try {
        const backupRaw = fs.readFileSync(this.backupPath, 'utf8');
        const backupData = JSON.parse(backupRaw);
        if (Array.isArray(backupData.games)) {
          for (const g of backupData.games) {
            this.saveGame(g);
          }
        }
      } catch (e) {
        console.warn('Could not restore from JSON backup on init:', e);
      }
    }

    this.persist();
    console.log(`[Mythic GM] Persistent SQLite database initialized at: ${this.dbPath}`);
  }

  persist() {
    if (!this.db) return;
    try {
      const data = this.db.export();
      const buffer = Buffer.from(data);
      fs.writeFileSync(this.dbPath, buffer);

      // Keep a redundant readable JSON backup file
      const games = this.getGames();
      fs.writeFileSync(this.backupPath, JSON.stringify({ version: 1, updatedAt: Date.now(), games }, null, 2), 'utf8');
    } catch (err) {
      console.error('Failed to persist SQLite database to disk:', err);
    }
  }

  getGames() {
    if (!this.db) return [];
    try {
      const res = this.db.exec(`
        SELECT id, name, chaos, scenes, characters, threads, created_at, updated_at
        FROM games
        ORDER BY updated_at DESC;
      `);

      if (!res.length || !res[0].values.length) return [];

      return res[0].values.map(row => ({
        id: row[0],
        name: row[1],
        chaos: row[2],
        scenes: JSON.parse(row[3] || '[]'),
        characters: JSON.parse(row[4] || '[]'),
        threads: JSON.parse(row[5] || '[]'),
        createdAt: row[6],
        updatedAt: row[7]
      }));
    } catch (err) {
      console.error('Error fetching games from SQLite:', err);
      return [];
    }
  }

  getGame(id) {
    if (!this.db) return null;
    try {
      const stmt = this.db.prepare(`
        SELECT id, name, chaos, scenes, characters, threads, created_at, updated_at
        FROM games
        WHERE id = :id;
      `);
      stmt.bind({ ':id': id });

      if (stmt.step()) {
        const row = stmt.get();
        stmt.free();
        return {
          id: row[0],
          name: row[1],
          chaos: row[2],
          scenes: JSON.parse(row[3] || '[]'),
          characters: JSON.parse(row[4] || '[]'),
          threads: JSON.parse(row[5] || '[]'),
          createdAt: row[6],
          updatedAt: row[7]
        };
      }
      stmt.free();
      return null;
    } catch (err) {
      console.error('Error fetching game by id from SQLite:', err);
      return null;
    }
  }

  saveGame(game) {
    if (!this.db || !game || !game.id) return null;
    try {
      const now = Date.now();
      const createdAt = game.createdAt || now;
      const updatedAt = now;
      const chaos = typeof game.chaos === 'number' ? game.chaos : 5;
      const scenesJson = JSON.stringify(game.scenes || []);
      const charsJson = JSON.stringify(game.characters || []);
      const threadsJson = JSON.stringify(game.threads || []);

      this.db.run(`
        INSERT INTO games (id, name, chaos, scenes, characters, threads, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(id) DO UPDATE SET
          name = excluded.name,
          chaos = excluded.chaos,
          scenes = excluded.scenes,
          characters = excluded.characters,
          threads = excluded.threads,
          updated_at = excluded.updated_at;
      `, [game.id, game.name, chaos, scenesJson, charsJson, threadsJson, createdAt, updatedAt]);

      this.persist();

      return {
        ...game,
        chaos,
        createdAt,
        updatedAt
      };
    } catch (err) {
      console.error('Error saving game to SQLite:', err);
      return null;
    }
  }

  deleteGame(id) {
    if (!this.db) return false;
    try {
      this.db.run("DELETE FROM games WHERE id = ?;", [id]);
      this.persist();
      return true;
    } catch (err) {
      console.error('Error deleting game from SQLite:', err);
      return false;
    }
  }

  exportBackup() {
    const games = this.getGames();
    return JSON.stringify({
      version: 1,
      exportedAt: Date.now(),
      application: "Mythic GM Desktop",
      dbPath: this.dbPath,
      games
    }, null, 2);
  }

  importBackup(backupData) {
    if (!backupData || !Array.isArray(backupData.games)) return [];
    try {
      for (const g of backupData.games) {
        if (g && g.id && g.name) {
          this.saveGame(g);
        }
      }
      return this.getGames();
    } catch (err) {
      console.error('Error importing games into SQLite:', err);
      return [];
    }
  }

  getDbPath() {
    return this.dbPath;
  }
}

module.exports = new GameDatabase();
