export type usermanagementdeleteprops={
    todelete:boolean,
    handleDeleteClose:()=>void,
    deleteuserid: number |null,
    handleDeleteUser:(id:number)=>void,
    displayusername:string,
}
