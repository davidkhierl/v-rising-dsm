import {
  FormControl,
  FormLabel,
  FormHelperText,
  Switch,
} from '@chakra-ui/react';
import get from 'lodash/get';
import { ChangeEvent, useState } from 'react';
import { useGameSettingsStore } from 'renderer/store/gameSettingsStore';

export interface ToggleInputProps extends FieldProps {
  value?: boolean;
  onChange?: (value: boolean) => void;
}

const ToggleInput = (props: ToggleInputProps) => {
  const gameSettings = useGameSettingsStore((state) => state.gameSettings);
  const [value, setValue] = useState<'true' | 'false'>(
    get(gameSettings, props.id) ? 'true' : 'false'
  );

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(value === 'true' ? 'false' : 'true');
    if (props.onChange) props.onChange(event.currentTarget.value !== 'true');
  };

  return (
    <FormControl>
      <FormLabel htmlFor={props.id}>
        {props.label}: {value}
      </FormLabel>
      <Switch
        id={props.id}
        onChange={handleOnChange}
        defaultChecked={props.value}
        value={value}
        isChecked={value === 'true'}
        size="lg"
      />
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

export default ToggleInput;
