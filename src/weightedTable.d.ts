export interface WeightedTableEntry<T>{
    0: number
    1: T,
}
export interface WeightedTable<T>  extends Array<WeightedTableEntry<T>> {
    [index:number]: WeightedTableEntry<T>
}
