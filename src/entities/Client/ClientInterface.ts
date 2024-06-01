type input_DTO = {
    user_id: string,
    name: string,
    type: string
};

export default interface ClientInterface {
    userId: string;
    name: string;
    type: string;

    create(client: input_DTO): Promise<void>;
    list(clients: []): Promise<[]>;
    listOne(clientId: string): Promise<any>;
}