export type isactivemodalprops={
    showisactive: boolean;
    handlecloseisactive: () => void;
    isactiveitem: {
      leadId: number;
      leadName: string;
      isActive: number;
    } | null;
    handleleadsuserList: () => void;
}