import {
	CapacitorSQLite,
	SQLiteConnection,
	SQLiteDBConnection
} from '@capacitor-community/sqlite'
import { Capacitor } from '@capacitor/core'
import { Publication } from 'src/app/models/publication'
import { PublicationRepository } from 'src/app/services/publication/publication-repository'

export class PublicationSqliteData extends PublicationRepository {

	private sqlite: SQLiteConnection = new SQLiteConnection( CapacitorSQLite )
	private db !: SQLiteDBConnection
	private plataforma: string       = ''
	private DB_TABLE_NAME            = 'publication'
	private DB_NAME                  = 'publication'
	private DB_ENCRIPT               = false
	private DB_MODE                  = 'no-encryption'
	private DB_VERSION               = 1
	private DB_READ_ONLY             = false
	private DB_COL_ID                = 'id'
	private DB_COL_TITLE             = 'title'
	private DB_COL_DESCRIPTION       = 'description'
	private DB_COL_IMAGE             = 'image'
	private DB_COL_CREATE_AT         = 'createdAt'
	private DB_SQL_TABLAS            = `CREATE TABLE IF NOT EXISTS ${this.DB_TABLE_NAME} (
    ${this.DB_COL_ID} TEXT PRIMARY KEY NOT NULL,
    ${this.DB_COL_TITLE} TEXT NOT NULL,
    ${this.DB_COL_DESCRIPTION} TEXT NOT NULL,
    ${this.DB_COL_IMAGE} TEXT NOT NULL,
    ${this.DB_COL_CREATE_AT} TEXT NOT NULL
    )`


	async init(): Promise<void> {
		await this.initPlugin()
	}

	async getPublications(): Promise<Publication[]> {
		const sql                  = `SELECT * FROM ${this.DB_TABLE_NAME}`
		const response             = await this.db.query( sql )
		const result: Publication[] = []
		response.values?.forEach( ( element: any ) => {
			element.createdAt = new Date( element.createdAt )
			result.push( element )
		} )
		return result
	}

	async getPublication( id: string ): Promise<Publication | undefined> {
		const sql      = `SELECT * FROM ${this.DB_TABLE_NAME} WHERE ${this.DB_COL_ID} = ?`
		const response = await this.db.query( sql, [ id ] )
		let result: Publication | undefined

		if ( response.values && response.values.length > 0 ) {
			result = response.values[0]
		}
		if ( result ) {
			result.createdAt = new Date( result.createdAt )
		}

		return result
	}

	async addPublication( publication: Publication ): Promise<boolean> {
		try{
			const sql = `INSERT INTO ${this.DB_TABLE_NAME} (${this.DB_COL_ID}, ${this.DB_COL_TITLE}, ${this.DB_COL_DESCRIPTION}, ${this.DB_COL_IMAGE}, ${this.DB_COL_CREATE_AT}) VALUES (?, ?, ?, ?, ?)`
			const values = [publication.id, publication.title, publication.description, publication.image, publication.createdAt.toISOString()]
			await this.db.run(sql, values)
			return true
		}
		catch(e){
			return false
		}
	}

	async updatePublication( publication: Publication ): Promise<boolean> {
		try{
			const sql = `UPDATE ${this.DB_TABLE_NAME} SET ${this.DB_COL_TITLE} = ?, ${this.DB_COL_DESCRIPTION} = ?, ${this.DB_COL_IMAGE} = ?, ${this.DB_COL_CREATE_AT} = ? WHERE ${this.DB_COL_ID} = ?`
			const values = [publication.title, publication.description, publication.image, publication.createdAt.toISOString(), publication.id]
			await this.db.run(sql, values)
			return true
		}
		catch(e){
			return false
		}
	}

	async deletePublication( id: string ): Promise<boolean> {
		try{
			const sql = `DELETE FROM ${this.DB_TABLE_NAME} WHERE ${this.DB_COL_ID} = ?`
			await this.db.run(sql, [id])
			return true
		}
		catch(e){
			return false
		}
	}


	private async _initPluginWeb(): Promise<void> {
		await customElements.whenDefined( 'jeep-sqlite' )
		const jeepSqliteEl = document.querySelector( 'jeep-sqlite' )
		if ( jeepSqliteEl != null ) {
			await this.sqlite.initWebStore()
		}
	}

	async initPlugin() {
		this.plataforma = Capacitor.getPlatform()
		if ( this.plataforma == 'web' ) {
			await this._initPluginWeb()
		}
		await this.openConnection()
		await this.db.execute( this.DB_SQL_TABLAS )
	}

	async openConnection() {
		const ret    = await this.sqlite.checkConnectionsConsistency()
		const isConn = ( await this.sqlite.isConnection( this.DB_NAME,
			this.DB_READ_ONLY ) ).result
		if ( ret.result && isConn ) {
			this.db =
				await this.sqlite.retrieveConnection( this.DB_NAME, this.DB_READ_ONLY )
		}
		else {
			this.db = await this.sqlite.createConnection(
				this.DB_NAME,
				this.DB_ENCRIPT,
				this.DB_MODE,
				this.DB_VERSION,
				this.DB_READ_ONLY
			)
		}
		await this.db.open()
	}
}
