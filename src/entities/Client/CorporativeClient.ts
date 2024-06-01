import CorporativeClientInterface from "./CorporateClientInterface";

export class CorporativeClient implements CorporativeClientInterface {
    userId: string;
    name: string;
    type: string = "PJ";

    refinance(listDebits: []): Promise<void> {
        return new Promise((resolve, reject) => {
            // Implementação
            resolve();
        });
    }
    create(client: { user_id: string; name: string; type: string; }): Promise<void> {
        return new Promise((resolve, reject) => {
            // Implementação
            resolve();
        });
    }
    list(clients: []): Promise<[]> {
        return new Promise((resolve, reject) => {
            // Implementação
            resolve([]);
        });
    }
    listOne(clientId: string): Promise<any> {
        return new Promise((resolve, reject) => {
            // Implementação
            resolve([]);
        });
    }
}