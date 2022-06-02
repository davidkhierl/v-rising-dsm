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
  {
    fieldName: 'BloodBoundEquipment',
    type: 'toggle',
    default: true,
    description:
      'Determines whether or not you keep your equipment after dying.',
  },
  {
    fieldName: 'TeleportBoundItems',
    type: 'toggle',
    default: true,
    description:
      'Determines whether or not items will block you from teleporting through a Vampire Waygate.',
  },
  {
    fieldName: 'AllowGlobalChat',
    type: 'toggle',
    default: true,
    description: 'Turns Global Chat on or off.',
  },
  {
    fieldName: 'AllWaypointsUnlocked',
    type: 'toggle',
    default: false,
    description:
      'Determines whether all Vampire Waygates are active or inactive when in a new world.',
  },
  {
    fieldName: 'FreeCastleClaim',
    type: 'toggle',
    default: false,
    description:
      'Determines whether or not Castles can be claimed at no resource cost.',
  },
  {
    fieldName: 'FreeCastleDestroy',
    type: 'toggle',
    default: false,
    description:
      'Determines whether or not Castles can be destroyed at no resource cost.',
  },
  {
    fieldName: 'InactivityKillEnabled',
    type: 'toggle',
    default: true,
    description: 'Its function is not known yet',
  },
  {
    fieldName: 'InactivityKillTimeMin',
    type: 'slider',
    default: 333600,
    min: 1000,
    max: 10000,
    steps: 10,
    description: 'Its function is not known yet',
  },
  {
    fieldName: 'InactivityKillTimeMax',
    type: 'slider',
    default: 604800,
    min: 10000,
    max: 604800,
    steps: 10,
    description: 'Its function is not known yet',
  },
  {
    fieldName: 'InactivityKillSafeTimeAddition',
    type: 'slider',
    default: 172800,
    min: 10000,
    max: 20000,
    steps: 10,
    description: 'Its function is not known yet',
  },
  {
    fieldName: 'InactivityKillTimerMaxItemLevel',
    type: 'slider',
    default: 84,
    min: 0,
    max: 100,
    steps: 1,
    description: 'Its function is not known yet',
  },
  {
    fieldName: 'DisableDisconnectedDeadEnabled',
    type: 'toggle',
    default: true,
    description: 'Its function is not known yet',
  },
  {
    fieldName: 'InventoryStacksModifier',
    type: 'slider',
    default: 1.0,
    min: 0.1,
    max: 5,
    steps: 0.1,
    description: 'Modifies the size of inventory stacks.',
  },
  {
    fieldName: 'DropTableModifier_General',
    type: 'slider',
    default: 1.0,
    min: 0.1,
    max: 5,
    steps: 0.1,
    description: 'Modifies how much loot enemies drop.',
  },
  {
    fieldName: 'DropTableModifier_Missions',
    type: 'slider',
    default: 1.0,
    min: 0.1,
    max: 5,
    steps: 0.1,
    description: 'Modifies how much loot drops from quests.',
  },
  {
    fieldName: 'MaterialYieldModifier_Global',
    type: 'slider',
    default: 1.0,
    min: 0.1,
    max: 5,
    steps: 0.1,
    description: 'Modifies how much loot drops when you mine a resource node.',
  },
  {
    fieldName: 'BloodEssenceYieldModifier',
    type: 'slider',
    default: 1.0,
    min: 0.1,
    max: 5,
    steps: 0.1,
    description: 'Modifies how much Blood Essence you get from an enemy.',
  },
];

export default gameConfigs;
