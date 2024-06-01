import RiskCalculationStrategy from "./RiskCalculatorStrategy";

export default class CorporateRiskCalculationStrategy implements RiskCalculationStrategy {
    calculate(openedDebits): string {
        const totalValueOpened = parseFloat(openedDebits.reduce((total, deb) => total + Number(deb), 0));
        if (totalValueOpened > 50000 || openedDebits.length > 20) return 'alto';
        if (totalValueOpened > 20000 || openedDebits.length > 10) return 'médio';
        return 'baixo';
    }
}