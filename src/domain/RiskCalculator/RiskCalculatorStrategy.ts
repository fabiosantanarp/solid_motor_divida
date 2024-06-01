export default interface RiskCalculationStrategy {
    calculate(openedDebits): string;
}