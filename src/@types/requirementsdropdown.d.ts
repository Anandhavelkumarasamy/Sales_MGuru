interface requirementprops {
  value: string;
  onChange: (value: string) => void; // or use (e: React.ChangeEvent<HTMLSelectElement>) => void if expecting an event
  errorText?: string | undefined;
}

export type requirementdropdownprops = {
  RequirementsId: string;
  RequirementsName: string;
};
