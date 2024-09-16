type leadsdata={
    displayName: string,
        value:number
}
type overduedata={
    displayName: string,
    value: number
}



export type DashboradDataProps= {
    displayName: string,
    key: string,
    value: number,
    colorCode:string,
    type: number,
    leads:leadsdata,
    over_due:overduedata,
  }