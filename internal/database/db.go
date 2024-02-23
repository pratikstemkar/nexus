package database

import (
	"database/sql"

	_ "github.com/lib/pq"
)

type Database struct {
	db *sql.DB
}

func NewDatabase() (*Database, error) {
	db, err := sql.Open(
		"postgres",
		"postgresql://pratiktemkarofficial:Hs8Ow7jryumt@ep-odd-wave-a5ouvbxb.us-east-2.aws.neon.tech/nexdb?sslmode=require",
	)
	if err != nil {
		return nil, err
	}

	return &Database{db: db}, nil
}

func (d *Database) Close() {
	d.db.Close()
}

func (d *Database) GetDB() *sql.DB {
	return d.db
}
