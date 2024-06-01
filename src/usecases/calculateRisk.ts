import DebitRepositoryInterface from '../DebitRepositoryInterface';
import RiskCalculationStrategyFactory from '../domain/RiskCalculator/RIskCalculatorStrategyFactory';
import ClientInterface from '../entities/Client/ClientInterface';

export default class CalculateRisk {
    constructor(
        readonly repository: DebitRepositoryInterface
    ) { }

    async execute(client:ClientInterface) {
        const debits = await this.repository.getDebits(client.userId, 'open');
        const openedDebits = debits[0].map(deb => parseFloat(deb.value));
        const strategy = RiskCalculationStrategyFactory.create(client.type);
        return strategy.calculate(openedDebits);
    }
}
