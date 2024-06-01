import DebitRepositoryInterface from './DebitRepositoryInterface';

class FakeDebitRepository implements DebitRepositoryInterface {
    async create(debitList: string[]): Promise<void> {}
}

export default FakeDebitRepository;
