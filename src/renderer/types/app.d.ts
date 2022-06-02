interface FieldProps {
  id: string;
  label: string;
  helperText?: string;
}

type GameConfigs = Array<FieldSelect | FieldSlider | FieldToggle | NestedField>;

interface Field {
  fieldName: string;
  type: FieldType;
  default: number | string | boolean;
  description?: string;
}

interface FieldSelect extends Field {
  type: 'select';
  settings: string[];
  default: string;
}

interface FieldSlider extends Field {
  min: number;
  max: number;
  type: 'slider';
  steps?: number;
  default: number;
}

interface FieldToggle extends Field {
  type: 'toggle';
  default: boolean;
}

interface NestedField extends Omit<Field, 'default'> {
  type: 'nested-field';
  children: GameConfigs;
}

type FieldType = 'slider' | 'select' | 'toggle' | 'nested-field';
