export type GameConfigs = Array<
  FieldSelect | FieldSlider | FieldToggle | NestedField
>;

export interface Field {
  fieldName: string;
  type: FieldType;
  default: number | string | boolean;
  description?: string;
}

export interface FieldSelect extends Field {
  type: 'select';
  settings: string[];
  default: string;
}

export interface FieldSlider extends Field {
  min: number;
  max: number;
  type: 'slider';
  default: number;
}

export interface FieldToggle extends Field {
  type: 'toggle';
  default: boolean;
}

export interface NestedField extends Omit<Field, 'default'> {
  type: 'nested-field';
  children: GameConfigs;
}

export type FieldType = 'slider' | 'select' | 'toggle' | 'nested-field';

const gameConfigs: GameConfigs = [
  {
    fieldName: 'GameModeType',
    type: 'select',
    settings: ['PvE', 'PvP'],
    default: 'PvE',
    description: "Sets the kind of game mode you're playing.",
  },
  {
    fieldName: 'CastleDamageMode',
    type: 'select',
    settings: ['Always', 'Never', 'TimeRestricted'],
    default: 'Never',
    description:
      'Sets when Castles can be damaged. "TimeRestricted" uses VSCastle times.',
  },
  {
    fieldName: 'SiegeWeaponHealth',
    type: 'select',
    settings: ['VeryLow', 'Low', 'Normal', 'High', 'VeryHigh'],
    default: 'Normal',
    description: 'Determines the health of Siege Weapons.',
  },
  {
    fieldName: 'PlayerDamageMode',
    type: 'select',
    settings: ['Always', 'TimeRestricted'],
    default: 'Always',
    description:
      'Determines whether or not other players can be damaged. "TimeRestricted" uses VsPlayer times.',
  },
  {
    fieldName: 'CastleHeartDamageMode',
    type: 'select',
    settings: [
      'CanBeDestroyedOnlyWhenDecaying',
      'CanBeDestroyedByPlayers',
      'CanBeSeizedOrDestroyedByPlayers',
    ],
    default: 'CanBeDestroyedOnlyWhenDecaying',
    description:
      'Determines how and when Castle Hearts can be destroyed or seized.',
  },
  {
    fieldName: 'PvPProtectionMode',
    type: 'select',
    settings: ['Short', 'Medium', 'Long'],
    default: 'Medium',
    description: 'PvP protection duration for newly created players.',
  },
  {
    fieldName: 'DeathContainerPermission',
    type: 'select',
    settings: ['Anyone', 'ClanMembers'],
    default: 'ClanMembers',
    description: 'Defines who can loot your dropped items after you die.',
  },
  {
    fieldName: 'RelicSpawnType',
    type: 'select',
    settings: ['Unique', 'Plentiful'],
    default: 'Plentiful',
    description:
      'Determines whether there is only one of each Soul Shard in the world (Unique) or whether there can be more than one of each type (Plentiful).',
  },
  {
    fieldName: 'CanLootEnemyContainers',
    type: 'toggle',
    default: false,
    description:
      'Determines whether or not you can loot the chests of other players not in your clan.',
  },
];

export default gameConfigs;
