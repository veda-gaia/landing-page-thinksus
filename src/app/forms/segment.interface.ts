import BaseInterface from '../interfaces/base.interface';
import { SectionInterface } from './section.interface';

export interface SegmentInterface extends BaseInterface {
  name: string;
  section: SectionInterface;
}
