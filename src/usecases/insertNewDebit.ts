import DebitRepositoryInterface from '../DebitRepositoryInterface';
export default class insertNewDebit {
    constructor(readonly repository: DebitRepositoryInterface) {}
    async execute(listOfDebits: any): Promise<void>{
        await this.repository.create(listOfDebits);
    }
}