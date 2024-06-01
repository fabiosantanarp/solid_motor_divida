import RiskCalculationStrategy from "./RiskCalculatorStrategy";

export default class IndividualRiskCalculationStrategy implements RiskCalculationStrategy {
    calculate(openedDebits): string {
        const totalValueOpened = parseFloat(openedDebits.reduce((total, deb) => total + Number(deb), 0));
        if (totalValueOpened > 10000 || openedDebits.length > 10) return 'alto';
        if (totalValueOpened > 5000 || openedDebits.length > 5) return 'médio';
        return 'baixo';
    }
}