import {
  FormControl,
  FormLabel,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  FormHelperText,
} from '@chakra-ui/react';

export interface SliderInputProps {
  id: string;
  label: string;
  helperText?: string;
  value?: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

const SliderInput = (props: SliderInputProps) => {
  return (
    <FormControl>
      <FormLabel htmlFor={props.id}>
        {props.label}: {props.value}
      </FormLabel>
      <Slider
        id={props.id}
        aria-label={props.label}
        defaultValue={props.value}
        min={props.min}
        max={props.max}
        step={0.1}
        onChange={props.onChange}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
      {props.helperText && <FormHelperText>{props.helperText}</FormHelperText>}
    </FormControl>
  );
};

export default SliderInput;
