
export default interface DebitRepositoryInterface {
    create(debitList:Array<string>) : Promise<void>
    getDebits(userId:string, status?:string) : Promise<any>
}