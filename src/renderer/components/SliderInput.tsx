import {
  FormControl,
  FormLabel,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  FormHelperText,
} from '@chakra-ui/react';

export interface SliderInputProps extends FieldProps {
  value?: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  steps?: number;
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
        step={props.steps}
        onChange={props.onChange}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
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

export default SliderInput;
