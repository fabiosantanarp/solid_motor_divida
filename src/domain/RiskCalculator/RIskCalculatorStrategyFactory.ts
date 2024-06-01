import IndividualRiskCalculationStrategy from './IndividualRiskCalculationStrategy';
import CorporateRiskCalculationStrategy from './CorporateRiskCalculationStrategy';
import RiskCalculationStrategy from './RiskCalculatorStrategy';

export default abstract class RiskCalculationStrategyFactory {
    static create(type: string): RiskCalculationStrategy {
        if (type === 'PF') {
            return new IndividualRiskCalculationStrategy();
        } else if (type === 'PJ') {
            return new CorporateRiskCalculationStrategy();
        }
        throw new Error('Tipo de cliente desconhecido');
    }
}