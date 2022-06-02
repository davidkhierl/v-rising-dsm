/* eslint-disable no-useless-return */
/* eslint-disable consistent-return */
import { Stack } from '@chakra-ui/react';
import SelectInput from 'renderer/components/SelectInput';
import SliderInput from 'renderer/components/SliderInput';
import gameConfigs from 'renderer/gameConfigItems';
import get from 'lodash/get';
import { useGameSettingsStore } from 'renderer/store/gameSettingsStore';
import ToggleInput from 'renderer/components/ToggleInput';
import {
  isFieldTypeSlider,
  isFieldTypeSelect,
  isFieldTypeToggle,
} from 'renderer/utils/utils';
import { useMemo } from 'react';

const GameSettingsItems = () => {
  const gameSettings = useGameSettingsStore((state) => state.gameSettings);

  const setGameSettings = useGameSettingsStore(
    (state) => state.setGameSettings
  );

  const gameSettingsField = useMemo(
    () =>
      gameConfigs.map((setting) => {
        if (!gameSettings) return;
        if (isFieldTypeSlider(setting)) {
          return (
            <SliderInput
              key={setting.fieldName}
              id={setting.fieldName}
              label={setting.fieldName}
              helperText={setting.description}
              min={setting.min}
              max={setting.max}
              steps={setting.steps}
              value={get(gameSettings, setting.fieldName) ?? setting.default}
              onChange={(value) =>
                setGameSettings({
                  [setting.fieldName]: value,
                })
              }
            />
          );
        }

        if (isFieldTypeSelect(setting)) {
          return (
            <SelectInput
              key={setting.fieldName}
              id={setting.fieldName}
              label={setting.fieldName}
              helperText={setting.description}
              settings={setting.settings}
              value={get(gameSettings, setting.fieldName) ?? setting.default}
              onChange={(value) =>
                setGameSettings({
                  [setting.fieldName]: value.currentTarget.value,
                })
              }
            />
          );
        }

        if (isFieldTypeToggle(setting)) {
          return (
            <ToggleInput
              key={setting.fieldName}
              id={setting.fieldName}
              label={setting.fieldName}
              helperText={setting.description}
              value={get(gameSettings, setting.fieldName) ?? setting.default}
              onChange={(value) =>
                setGameSettings({
                  [setting.fieldName]: value,
                })
              }
            />
          );
        }

        return;
      }),
    [gameSettings, setGameSettings]
  );
  return (
    <Stack spacing={12} py={4}>
      {gameSettingsField}
    </Stack>
  );
};

export default GameSettingsItems;
