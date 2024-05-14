import { CompanySegmentEnum } from '../enums/company-segment.enum';
import { SegmentList } from './en-segment';

export const ptAgribusinessList: SegmentList[] = [
  { value: CompanySegmentEnum.bovine, label: 'Bovina' },
  { value: CompanySegmentEnum.pork, label: 'Suína' },
  { value: CompanySegmentEnum.birds, label: 'Aves' },
  {
    value: CompanySegmentEnum.other_meat_animals,
    label: 'Outros animais de Corte',
  },
  { value: CompanySegmentEnum.dairy, label: 'Laticínio' },
  { value: CompanySegmentEnum.soy, label: 'Soja' },
  { value: CompanySegmentEnum.wood, label: 'Madeira' },
  { value: CompanySegmentEnum.sugar_cane, label: 'Cana-de-açúcar' },
  {
    value: CompanySegmentEnum.other_platations,
    label: 'Outra Plantação larga escala',
  },
  {
    value: CompanySegmentEnum.subsistence_plantation,
    label: 'Plantação subsistência',
  },
];

export const ptIndustryList: SegmentList[] = [
  {
    value: CompanySegmentEnum.heavy_industry,
    label: 'Pesada (siderúrgicas ou metalúrgicas)',
  },
  { value: CompanySegmentEnum.construction, label: 'Construção Civil' },
  { value: CompanySegmentEnum.automotive, label: 'Automotiva e sistemistas' },
  { value: CompanySegmentEnum.food, label: 'Alimentação' },
  { value: CompanySegmentEnum.textile, label: 'Têxtil ou de peles' },
  { value: CompanySegmentEnum.pharmaceutical, label: 'Farmacêutica' },
  { value: CompanySegmentEnum.technology, label: 'Informática ou Tecnologia' },
  { value: CompanySegmentEnum.energy, label: 'Energia' },
  {
    value: CompanySegmentEnum.another_transformation,
    label: 'Outra transformação',
  },
  { value: CompanySegmentEnum.electronics, label: 'Eletrônica' },
];

export const ptServicesList: SegmentList[] = [
  {
    value: CompanySegmentEnum.commerce_food,
    label: 'Comércio - Alimentação e bebidas',
  },
  {
    value: CompanySegmentEnum.commerce_clothing,
    label: 'Comércio - Vestuário',
  },
  {
    value: CompanySegmentEnum.commerce_pharmacy,
    label: 'Comércio - Farmácia e Cosméticos',
  },
  { value: CompanySegmentEnum.education, label: 'Educacional' },
  { value: CompanySegmentEnum.accommodation, label: 'Hospedagem' },
  { value: CompanySegmentEnum.cleaning, label: 'Limpeza e Manutenção' },
  { value: CompanySegmentEnum.transport, label: 'Transportes' },
  { value: CompanySegmentEnum.sports, label: 'Esportes e Atividades Físicas' },
  { value: CompanySegmentEnum.leisure, label: 'Lazer ( tenimento diversos)' },
  { value: CompanySegmentEnum.consultancy, label: 'Consultoria' },
  { value: CompanySegmentEnum.resale, label: 'Revenda de outros produtos' },
  {
    value: CompanySegmentEnum.miscellaneous,
    label: 'Serviços Diversos (salão de beleza, segurança, jardinagem, outros)',
  },
  {
    value: CompanySegmentEnum.liberal_profession,
    label:
      'Profissional Liberal (médico, dentista, psicólogos, professores, outros)',
  },
];
