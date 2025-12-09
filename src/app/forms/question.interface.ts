import BaseInterface from '../interfaces/base.interface';
import { DimensionAreaInterface } from './dimension-area.interface';

export interface QuestionInterface extends BaseInterface {
  name: string;
  dimension: string;
  area: DimensionAreaInterface;
  description: string;
  type: string;
  weight: number;
  ods: number[];
  documentNeeded: boolean;
  esgFormId: string;
  questionId: string;
}
