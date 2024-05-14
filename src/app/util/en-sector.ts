import { CompanySectionEnum } from "../enums/company-section.enum";

export const enSectorList: SectorList[] = [
  {
    value: CompanySectionEnum.Agribusiness,
    label: 'Agribusiness',
  },
  {
    value:  CompanySectionEnum.Industry,
    label: 'Industry',
  },
  {
    value:  CompanySectionEnum.Services,
    label: 'Services',
  },
];

type SectorList = {
  value: CompanySectionEnum;
  label: string;
};
