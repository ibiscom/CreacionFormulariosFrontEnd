import { BooleanString } from './boolean-string.type';

export interface SelectItemEntity {
  disabled: BooleanString;
  label: string;
  value: { class: string; [key: string]: any };
  escape: BooleanString;
  noSelectionOption: BooleanString;
}
