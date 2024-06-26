import insertNewDebit from "../src/usecases/insertNewDebit";
import CalculateRisk from '../src/usecases/calculateRisk';
import DebitRepository from "../src/DebitRepository";
import * as connection from "../src/common/connection";
import { IndividualClient } from "../src/entities/Client/IndividualClient";
import { CorporativeClient } from "../src/entities/Client/CorporativeClient";

let conn;

beforeAll(async () => {
    conn = await connection.connect();
});

beforeEach(async () => {
    await conn.query("DELETE FROM debits");
});

// Destrói o banco de dados após os testes
afterAll(async () => {    
    await conn.end();
});


test('Deve considerar um risco alto de PJ se tiver divida aberta maior que 50.000', async () => {
    const clientPJ = new CorporativeClient();
    clientPJ.name = 'Teste';
    clientPJ.userId = "8301023as2df309123jaks9213923";

    const debitRepository = new DebitRepository();
    const insertNewDebitUseCase = new insertNewDebit(debitRepository);
    const debitList = [
        { user_id: clientPJ.userId, value: 150, status: "close" },
        { user_id: clientPJ.userId, value: 51000, status: "open" }
    ];
    await insertNewDebitUseCase.execute(debitList);
    const calculateRiskUseCase = new CalculateRisk(debitRepository);
    const risk = await calculateRiskUseCase.execute(clientPJ);
    expect(risk).toBe('alto');
});

test('Deve considerar um risco médio de PJ se tiver divida aberta maior que 20.000', async () => {
    const clientPJ = new CorporativeClient();
    clientPJ.name = 'Teste';
    clientPJ.userId = "8301023as2df309123jaks9213923";
    const debitRepository = new DebitRepository();
    const insertNewDebitUseCase = new insertNewDebit(debitRepository);
    const debitList = [
        { user_id: clientPJ.userId, value: 150, status: "close" },
        { user_id: clientPJ.userId, value: 21000, status: "open" },
        { user_id: clientPJ.userId, value: 1, status: "open" },
    ];
    await insertNewDebitUseCase.execute(debitList);
    const calculateRiskUseCase = new CalculateRisk(debitRepository);
    const risk = await calculateRiskUseCase.execute(clientPJ);
    expect(risk).toBe('médio');
});

test('Deve considerar um risco alto de PJ se tiver mais que 20 débitos abertos', async () => {
    const clientPJ = new CorporativeClient();
    clientPJ.name = 'Teste';
    clientPJ.userId = "8301023as2df309123jaks9213923";
    const debitRepository = new DebitRepository();
    const insertNewDebitUseCase = new insertNewDebit(debitRepository);
    const debitList = Array.from({ length: 21 }, () => ({ user_id: clientPJ.userId, value: 5, status: "open" }));
    await insertNewDebitUseCase.execute(debitList);
    const calculateRiskUseCase = new CalculateRisk(debitRepository);
    const risk = await calculateRiskUseCase.execute(clientPJ);
    expect(risk).toBe('alto');
});

test('Deve considerar um risco médio de PJ se tiver mais que 10 débitos abertos', async () => {
    const clientPJ = new CorporativeClient();
    clientPJ.name = 'Teste';
    clientPJ.userId = "8301023as2df309123jaks9213923";
    const debitRepository = new DebitRepository();
    const insertNewDebitUseCase = new insertNewDebit(debitRepository);
    const debitList = Array.from({ length: 11 }, () => ({ user_id: clientPJ.userId, value: 10, status: "open" }));
    await insertNewDebitUseCase.execute(debitList);
    const calculateRiskUseCase = new CalculateRisk(debitRepository);
    const risk = await calculateRiskUseCase.execute(clientPJ);
    expect(risk).toBe('médio');
});

test('Deve considerar um risco baixo de PJ se tiver menos que 10 débitos abertos', async () => {
    const clientPJ = new CorporativeClient();
    clientPJ.name = 'Teste';
    clientPJ.userId = "8301023as2df309123jaks9213923";
    const debitRepository = new DebitRepository();
    const insertNewDebitUseCase = new insertNewDebit(debitRepository);
    const debitList = [
        { user_id: clientPJ.userId, value: 5, status: "open" }
    ];
    await insertNewDebitUseCase.execute(debitList);
    const calculateRiskUseCase = new CalculateRisk(debitRepository);
    const risk = await calculateRiskUseCase.execute(clientPJ);
    expect(risk).toBe('baixo');
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

