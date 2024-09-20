type storedata={
    token: string;
    dealeruserList: DealerUser[] | null;
    resetkey: string | null;
    leadsdata: Lead[];
    assignedselecteddealerid: string;
}
export type storedataprops={
    authLogin:storedata,
}