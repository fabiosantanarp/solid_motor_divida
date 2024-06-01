import DebitRepositoryInterface from './DebitRepositoryInterface';
import crypto from 'crypto';
import * as connection from "./common/connection";

class DebitRepository implements DebitRepositoryInterface {
    private connection;

    async create(debitList: any[]): Promise<void> {
        try {
            this.connection = await connection.connect();
            for (const debit of debitList) {
                const values = [crypto.randomUUID(), debit.user_id, debit.value, debit.status];
                await this.connection.query('INSERT INTO debits (uuid, user_id, value, status) VALUES (?, ?, ?, ?)', values);
            }
        } catch(error) {
            throw error;
        } finally {
            await this.connection.end();
        }
    }

    async getDebits(userId: string, status?: string) {
        this.connection = await connection.connect();
        try {
            let query = 'SELECT * FROM debits WHERE user_id = ?';
            let params = [userId];

            if (status) {
                query += ' AND status = ?';
                params.push(status);
            }

            return await this.connection.query(query, params);
        } catch(error) {
            throw error;
        } finally {
            await this.connection.end();
        }
    }
}

export default DebitRepository;
