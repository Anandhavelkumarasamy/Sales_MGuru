export type DealerItems = {
    userId: number;
    userName: string;
    phoneNumber: string;
    userTypeName: string;
    email: string;
  };

export interface  userlistprops extends paginationProps{
    items: DealerItems[];
  
  }


  