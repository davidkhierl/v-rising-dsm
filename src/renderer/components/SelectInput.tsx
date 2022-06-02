import {
  FormControl,
  FormLabel,
  FormHelperText,
  Select,
} from '@chakra-ui/react';
import get from 'lodash/get';
import { ChangeEvent } from 'react';
import { useGameSettingsStore } from 'renderer/store/gameSettingsStore';

export interface SelectInputProps extends FieldProps {
  value?: string;
  settings: string[];
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const SelectInput = (props: SelectInputProps) => {
  const gameSettings = useGameSettingsStore((state) => state.gameSettings);
  return (
    <FormControl>
      <FormLabel htmlFor={props.id}>
        {props.label}: {props.value}
      </FormLabel>
      <Select
        onChange={props.onChange}
        defaultValue={get(gameSettings, props.id)}
      >
        {props.settings.map((setting) => (
          <option key={setting} value={setting}>
            {setting}
          </option>
        ))}
      </Select>
      {props.helperText && (
        <FormHelperText
          color={
            props.helperText === 'Its function is not known yet'
              ? 'orange.500'
              : undefined
          }
        >
          {props.helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default SelectInput;
