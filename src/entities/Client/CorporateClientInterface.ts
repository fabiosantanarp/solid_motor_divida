import ClientInterface from "./ClientInterface";

export default interface CorporateClientInterface extends ClientInterface {
    refinance(listDebits:[]): Promise<void>
}