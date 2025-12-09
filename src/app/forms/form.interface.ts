import BaseInterface from '../interfaces/base.interface';
import { QuestionInterface } from './question.interface';
import { SectionInterface } from './section.interface';
import { SegmentInterface } from './segment.interface';

export interface FormInterface extends BaseInterface {
  section: SectionInterface;
  segments: SegmentInterface[];
  questions: QuestionInterface[];
}
