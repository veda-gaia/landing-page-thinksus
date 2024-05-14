import { CompanySegmentEnum } from '../enums/company-segment.enum';

export const enAgribusinessList: SegmentList[] = [
  { value: CompanySegmentEnum.bovine, label: 'Bovine' },
  { value: CompanySegmentEnum.pork, label: 'Swine' },
  { value: CompanySegmentEnum.birds, label: 'Poultry' },
  { value: CompanySegmentEnum.other_meat_animals, label: 'Beef cattle' },
  { value: CompanySegmentEnum.dairy, label: 'Dairy' },
  { value: CompanySegmentEnum.soy, label: 'Soy' },
  { value: CompanySegmentEnum.wood, label: 'Wood' },
  { value: CompanySegmentEnum.sugar_cane, label: 'Sugarcane' },
  { value: CompanySegmentEnum.other_platations, label: 'Large scale cropping' },
  {
    value: CompanySegmentEnum.subsistence_plantation,
    label: 'Subsistence plantation',
  },
];

export const enIndustryList: SegmentList[] = [
  {
    value: CompanySegmentEnum.heavy_industry,
    label: 'Heavy industry (steel industry and metallurgy)',
  },
  { value: CompanySegmentEnum.construction, label: 'Construction industry' },
  { value: CompanySegmentEnum.automotive, label: 'Automotive and Systemist' },
  { value: CompanySegmentEnum.food, label: 'food' },
  { value: CompanySegmentEnum.textile, label: 'Textile and skins' },
  { value: CompanySegmentEnum.pharmaceutical, label: 'pharmaceutical' },
  { value: CompanySegmentEnum.technology, label: 'IT or Technologies' },
  { value: CompanySegmentEnum.energy, label: 'energy' },
  {
    value: CompanySegmentEnum.another_transformation,
    label: 'Transformation industry',
  },
  { value: CompanySegmentEnum.electronics, label: 'electronics' },
];

export const enServicesList: SegmentList[] = [
  {
    value: CompanySegmentEnum.commerce_food,
    label: 'Trade: food and beverage',
  },
  { value: CompanySegmentEnum.commerce_clothing, label: 'Trade: clothing' },
  {
    value: CompanySegmentEnum.commerce_pharmacy,
    label: 'Trade: pharmacy and cosmetics',
  },
  { value: CompanySegmentEnum.education, label: 'educational' },
  { value: CompanySegmentEnum.accommodation, label: 'Hosting' },
  { value: CompanySegmentEnum.cleaning, label: 'cleaning and maintenance' },
  { value: CompanySegmentEnum.transport, label: 'Transportation' },
  { value: CompanySegmentEnum.sports, label: 'sports and physical activities' },
  {
    value: CompanySegmentEnum.leisure,
    label: 'Leisure (entertainment in general)',
  },
  { value: CompanySegmentEnum.consultancy, label: 'Consulting' },
  { value: CompanySegmentEnum.resale, label: 'Retail' },
  {
    value: CompanySegmentEnum.miscellaneous,
    label: 'Various services (beauty salon, security services, gardening etc.)',
  },
  {
    value: CompanySegmentEnum.liberal_profession,
    label:
      'Independent professional (Physicians, dentists, psychologists, teachers etc.)',
  },
];

export type SegmentList = {
  value: CompanySegmentEnum;
  label: string;
};
