import { CompanySectionEnum } from "../enums/company-section.enum";

export const ptSectorList: SectorList[] = [
  {
    value: CompanySectionEnum.Agribusiness,
    label: 'Agronegócio',
  },
  {
    value: CompanySectionEnum.Industry,
    label: 'Indústria',
  },
  {
    value: CompanySectionEnum.Services,
    label: 'Serviços',
  },
];

export type SectorList = {
  value: CompanySectionEnum;
  label: string;
};
