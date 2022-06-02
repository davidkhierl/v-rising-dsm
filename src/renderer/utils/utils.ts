export type FieldInputType =
  | FieldSelect
  | FieldSlider
  | FieldToggle
  | NestedField;

export function isFieldTypeSlider(
  fieldInput: FieldInputType
): fieldInput is FieldSlider {
  if ((fieldInput as FieldSlider).type === 'slider') {
    return true;
  }
  return false;
}

export function isFieldTypeSelect(
  fieldInput: FieldInputType
): fieldInput is FieldSelect {
  if ((fieldInput as FieldSelect).type === 'select') {
    return true;
  }
  return false;
}

export function isFieldTypeToggle(
  fieldInput: FieldInputType
): fieldInput is FieldToggle {
  if ((fieldInput as FieldToggle).type === 'toggle') {
    return true;
  }
  return false;
}

export function isFieldTypeNested(
  fieldInput: FieldInputType
): fieldInput is NestedField {
  if ((fieldInput as NestedField).type === 'nested-field') {
    return true;
  }
  return false;
}
