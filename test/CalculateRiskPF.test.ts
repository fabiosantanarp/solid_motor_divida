import insertNewDebit from "../src/usecases/insertNewDebit";
import CalculateRisk from '../src/usecases/calculateRisk';
import DebitRepository from "../src/DebitRepository";
import * as connection from "../src/common/connection";
import { IndividualClient } from "../src/entities/Client/IndividualClient";



let conn;

beforeAll(async () => {
    conn = await connection.connect();
});

beforeEach(async () => {
    await conn.query('DELETE FROM debits');
});

afterAll(async () => {
    await conn.end();
});

test('Deve considerar um risco alto de PF se tiver divida aberta maior que 10.000', async () => {
    const clientPF = new IndividualClient();
    clientPF.name = 'Teste';
    clientPF.userId = "8301023as2df309123jaks9213923";

    const debitRepository = new DebitRepository();
    const insertNewDebitUseCase = new insertNewDebit(debitRepository);
    const debitList = [
        { user_id: clientPF.userId, value: 150, status: "open" },
        { user_id: clientPF.userId, value: 5000, status: "open" },
        { user_id: clientPF.userId, value: 500, status: "open" },
        { user_id: clientPF.userId, value: 9300, status: "open" }
    ];
    await insertNewDebitUseCase.execute(debitList);
    const calculateRiskUseCase = new CalculateRisk(debitRepository);
    const risk = await calculateRiskUseCase.execute(clientPF);
    expect(risk).toBe('alto');
});

test('Deve considerar um risco médio de PF se tiver divida aberta maior que 5.000', async () => {
    const clientPF = new IndividualClient();
    clientPF.name = 'Teste';
    clientPF.userId = "8301023as2df309123jaks9213923";
    const debitRepository = new DebitRepository();
    const insertNewDebitUseCase = new insertNewDebit(debitRepository);
    const debitList = [
        { user_id: clientPF.userId, value: 150, status: "close" },
        { user_id: clientPF.userId, value: 5000, status: "open" },
        { user_id: clientPF.userId, value: 1, status: "open" },
    ];
    await insertNewDebitUseCase.execute(debitList);
    const calculateRiskUseCase = new CalculateRisk(debitRepository);
    const risk = await calculateRiskUseCase.execute(clientPF);
    expect(risk).toBe('médio');
});

test('Deve considerar um risco alto de PF se tiver mais que 10 débitos abertos', async () => {
    const clientPF = new IndividualClient();
    clientPF.name = 'Teste';
    clientPF.userId = "8301023as2df309123jaks9213923";
    const debitRepository = new DebitRepository();
    const insertNewDebitUseCase = new insertNewDebit(debitRepository);
    const debitList = [
        { user_id: clientPF.userId, value: 5, status: "open" },
        { user_id: clientPF.userId, value: 5, status: "open" },
        { user_id: clientPF.userId, value: 5, status: "open" },
        { user_id: clientPF.userId, value: 5, status: "open" },
        { user_id: clientPF.userId, value: 5, status: "open" },
        { user_id: clientPF.userId, value: 5, status: "open" },
        { user_id: clientPF.userId, value: 5, status: "open" },
        { user_id: clientPF.userId, value: 5, status: "open" },
        { user_id: clientPF.userId, value: 5, status: "open" },
        { user_id: clientPF.userId, value: 5, status: "open" },
        { user_id: clientPF.userId, value: 5, status: "open" }
    ];
    await insertNewDebitUseCase.execute(debitList);
    const calculateRiskUseCase = new CalculateRisk(debitRepository);
    const risk = await calculateRiskUseCase.execute(clientPF);
    expect(risk).toBe('alto');
});

test('Deve considerar um risco médio de PF se tiver mais que 5 débitos abertos', async () => {
    const clientPF = new IndividualClient();
    clientPF.name = 'Teste';
    clientPF.userId = "8301023as2df309123jaks9213923";
    const debitRepository = new DebitRepository();
    const insertNewDebitUseCase = new insertNewDebit(debitRepository);
    const debitList = [
        { user_id: clientPF.userId, value: 5, status: "open" },
        { user_id: clientPF.userId, value: 5, status: "open" },
        { user_id: clientPF.userId, value: 5, status: "open" },
        { user_id: clientPF.userId, value: 5, status: "open" },
        { user_id: clientPF.userId, value: 5, status: "open" },
        { user_id: clientPF.userId, value: 5, status: "open" }
    ];
    await insertNewDebitUseCase.execute(debitList);
    const calculateRiskUseCase = new CalculateRisk(debitRepository);
    const risk = await calculateRiskUseCase.execute(clientPF);
    expect(risk).toBe('médio');
});

test('Deve considerar um risco baixo de PF se tiver menos que 5 débitos abertos', async () => {
    const clientPF = new IndividualClient();
    clientPF.name = 'Teste';
    clientPF.userId = "8301023as2df309123jaks9213923";
    const debitRepository = new DebitRepository();
    const insertNewDebitUseCase = new insertNewDebit(debitRepository);
    const debitList = [
        { user_id: clientPF.userId, value: 5, status: "open" },
        { user_id: clientPF.userId, value: 5, status: "open" },
        { user_id: clientPF.userId, value: 5, status: "open" },
        { user_id: clientPF.userId, value: 5, status: "open" }
    ];
    await insertNewDebitUseCase.execute(debitList);
    const calculateRiskUseCase = new CalculateRisk(debitRepository);
    const risk = await calculateRiskUseCase.execute(clientPF);
    expect(risk).toBe('baixo');
});

