import IndividualClientInterface from "./IndividualClientInterface";

export class IndividualClient implements IndividualClientInterface {
    userId: string;
    name: string;
    type: string = "PF";

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