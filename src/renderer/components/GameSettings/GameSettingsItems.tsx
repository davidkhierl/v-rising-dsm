import { Stack } from '@chakra-ui/react';
import { SetStateAction } from 'react';
import SliderInput from 'renderer/components/SliderInput';
import { GameSettingsObject } from 'renderer/types/game-settings';

export interface GameSettingsItemsProps {
  gameSettingsData?: Partial<GameSettingsObject>;
  setGameSettingsData: React.Dispatch<
    SetStateAction<Partial<GameSettingsObject> | undefined>
  >;
}

const GameSettingsItems = ({
  gameSettingsData,
  setGameSettingsData,
}: GameSettingsItemsProps) => {
  return (
    <Stack spacing={8} py={4}>
      {gameSettingsData?.BloodEssenceYieldModifier && (
        <SliderInput
          id="BloodEssenceYieldModifier"
          label="BloodEssenceYieldModifier"
          helperText="Modifies how much Blood Essence you get from an enemy."
          min={0.1}
          max={5}
          value={gameSettingsData.BloodEssenceYieldModifier}
          onChange={(value) =>
            setGameSettingsData((state) => ({
              ...state,
              BloodEssenceYieldModifier: value,
            }))
          }
        />
      )}
      {gameSettingsData?.DropTableModifier_General && (
        <SliderInput
          id="DropTableModifier_General"
          label="DropTableModifier_General"
          helperText="Modifies how much loot enemies drop."
          min={0.1}
          max={5}
          value={gameSettingsData.DropTableModifier_General}
          onChange={(value) =>
            setGameSettingsData((state) => ({
              ...state,
              DropTableModifier_General: value,
            }))
          }
        />
      )}
      {gameSettingsData?.DropTableModifier_Missions && (
        <SliderInput
          id="DropTableModifier_Missions"
          label="BloodEssenceYieldModifier"
          helperText="Modifies how much loot drops from quests."
          min={0.1}
          max={5}
          value={gameSettingsData.DropTableModifier_Missions}
          onChange={(value) =>
            setGameSettingsData((state) => ({
              ...state,
              DropTableModifier_Missions: value,
            }))
          }
        />
      )}
      {gameSettingsData?.InventoryStacksModifier && (
        <SliderInput
          id="InventoryStacksModifier"
          label="InventoryStacksModifier"
          helperText="Modifies the size of inventory stacks."
          min={0.1}
          max={5}
          value={gameSettingsData.InventoryStacksModifier}
          onChange={(value) =>
            setGameSettingsData((state) => ({
              ...state,
              InventoryStacksModifier: value,
            }))
          }
        />
      )}
      {gameSettingsData?.MaterialYieldModifier_Global && (
        <SliderInput
          id="MaterialYieldModifier_Global"
          label="MaterialYieldModifier_Global"
          helperText="Modifies how much loot drops when you mine a resource node."
          min={0.1}
          max={5}
          value={gameSettingsData.MaterialYieldModifier_Global}
          onChange={(value) =>
            setGameSettingsData((state) => ({
              ...state,
              MaterialYieldModifier_Global: value,
            }))
          }
        />
      )}
      {gameSettingsData?.RefinementRateModifier && (
        <SliderInput
          id="RefinementRateModifier"
          label="RefinementRateModifier"
          helperText="Modifies the rate of Refining"
          min={0.1}
          max={5}
          value={gameSettingsData.RefinementRateModifier}
          onChange={(value) =>
            setGameSettingsData((state) => ({
              ...state,
              RefinementRateModifier: value,
            }))
          }
        />
      )}
      {gameSettingsData?.ServantConvertRateModifier && (
        <SliderInput
          id="ServantConvertRateModifier"
          label="ServantConvertRateModifier"
          helperText="Modifies the time it takes to convert a Servant."
          min={0.1}
          max={5}
          value={gameSettingsData.ServantConvertRateModifier}
          onChange={(value) =>
            setGameSettingsData((state) => ({
              ...state,
              ServantConvertRateModifier: value,
            }))
          }
        />
      )}
    </Stack>
  );
};

export default GameSettingsItems;
