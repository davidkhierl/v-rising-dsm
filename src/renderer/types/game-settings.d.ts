export interface GameSettingsObject {
  GameModeType: string;
  CastleDamageMode: string;
  SiegeWeaponHealth: string;
  PlayerDamageMode: string;
  CastleHeartDamageMode: string;
  PvPProtectionMode: string;
  DeathContainerPermission: string;
  RelicSpawnType: string;
  CanLootEnemyContainers: boolean;
  BloodBoundEquipment: boolean;
  TeleportBoundItems: boolean;
  AllowGlobalChat: boolean;
  AllWaypointsUnlocked: boolean;
  FreeCastleClaim: boolean;
  FreeCastleDestroy: boolean;
  InactivityKillEnabled: boolean;
  InactivityKillTimeMin: number;
  InactivityKillTimeMax: number;
  InactivityKillSafeTimeAddition: number;
  InactivityKillTimerMaxItemLevel: number;
  DisableDisconnectedDeadEnabled: boolean;
  DisableDisconnectedDeadTimer: number;
  InventoryStacksModifier: number;
  DropTableModifier_General: number;
  DropTableModifier_Missions: number;
  MaterialYieldModifier_Global: number;
  BloodEssenceYieldModifier: number;
  JournalVBloodSourceUnitMaxDistance: number;
  PvPVampireRespawnModifier: number;
  CastleMinimumDistanceInFloors: number;
  ClanSize: number;
  BloodDrainModifier: number;
  DurabilityDrainModifier: number;
  GarlicAreaStrengthModifier: number;
  HolyAreaStrengthModifier: number;
  SilverStrengthModifier: number;
  SunDamageModifier: number;
  CastleDecayRateModifier: number;
  CastleBloodEssenceDrainModifier: number;
  CastleSiegeTimer: number;
  CastleUnderAttackTimer: number;
  AnnounceSiegeWeaponSpawn: boolean;
  ShowSiegeWeaponMapIcon: boolean;
  BuildCostModifier: number;
  RecipeCostModifier: number;
  CraftRateModifier: number;
  ResearchCostModifier: number;
  RefinementCostModifier: number;
  RefinementRateModifier: number;
  ResearchTimeModifier: number;
  DismantleResourceModifier: number;
  ServantConvertRateModifier: number;
  RepairCostModifier: number;
  Death_DurabilityFactorLoss: number;
  Death_DurabilityLossFactorAsResources: number;
  StarterEquipmentId: number;
  StarterResourcesId: number;
  VBloodUnitSettings: any[];
  UnlockedAchievements: any[];
  UnlockedResearchs: any[];
  GameTimeModifiers: GameTimeModifiers;
  VampireStatModifiers: VampireStatModifiers;
  UnitStatModifiers_Global: UnitStatModifiersGlobal;
  UnitStatModifiers_VBlood: UnitStatModifiersVblood;
  EquipmentStatModifiers_Global: EquipmentStatModifiersGlobal;
  CastleStatModifiers_Global: CastleStatModifiersGlobal;
  PlayerInteractionSettings: PlayerInteractionSettings;
}

export interface GameTimeModifiers {
  DayDurationInSeconds: number;
  DayStartHour: number;
  DayStartMinute: number;
  DayEndHour: number;
  DayEndMinute: number;
  BloodMoonFrequency_Min: number;
  BloodMoonFrequency_Max: number;
  BloodMoonBuff: number;
}

export interface VampireStatModifiers {
  MaxHealthModifier: number;
  MaxEnergyModifier: number;
  PhysicalPowerModifier: number;
  SpellPowerModifier: number;
  ResourcePowerModifier: number;
  SiegePowerModifier: number;
  DamageReceivedModifier: number;
  ReviveCancelDelay: number;
}

export interface UnitStatModifiersGlobal {
  MaxHealthModifier: number;
  PowerModifier: number;
}

export interface UnitStatModifiersVblood {
  MaxHealthModifier: number;
  PowerModifier: number;
}

export interface EquipmentStatModifiersGlobal {
  MaxEnergyModifier: number;
  MaxHealthModifier: number;
  ResourceYieldModifier: number;
  PhysicalPowerModifier: number;
  SpellPowerModifier: number;
  SiegePowerModifier: number;
  MovementSpeedModifier: number;
}

export interface CastleStatModifiersGlobal {
  TickPeriod: number;
  DamageResistance: number;
  SafetyBoxLimit: number;
  TombLimit: number;
  VerminNestLimit: number;
  PylonPenalties: PylonPenalties;
  FloorPenalties: FloorPenalties;
  HeartLimits: HeartLimits;
  CastleLimit: number;
}

export interface PylonPenalties {
  Range1: Range1;
  Range2: Range2;
  Range3: Range3;
  Range4: Range4;
  Range5: Range5;
}

export interface Range1 {
  Percentage: number;
  Lower: number;
  Higher: number;
}

export interface Range2 {
  Percentage: number;
  Lower: number;
  Higher: number;
}

export interface Range3 {
  Percentage: number;
  Lower: number;
  Higher: number;
}

export interface Range4 {
  Percentage: number;
  Lower: number;
  Higher: number;
}

export interface Range5 {
  Percentage: number;
  Lower: number;
  Higher: number;
}

export interface FloorPenalties {
  Range1: Range12;
  Range2: Range22;
  Range3: Range32;
  Range4: Range42;
  Range5: Range52;
}

export interface Range12 {
  Percentage: number;
  Lower: number;
  Higher: number;
}

export interface Range22 {
  Percentage: number;
  Lower: number;
  Higher: number;
}

export interface Range32 {
  Percentage: number;
  Lower: number;
  Higher: number;
}

export interface Range42 {
  Percentage: number;
  Lower: number;
  Higher: number;
}

export interface Range52 {
  Percentage: number;
  Lower: number;
  Higher: number;
}

export interface HeartLimits {
  Level1: Level1;
  Level2: Level2;
  Level3: Level3;
  Level4: Level4;
}

export interface Level1 {
  Level: number;
  FloorLimit: number;
  ServantLimit: number;
}

export interface Level2 {
  Level: number;
  FloorLimit: number;
  ServantLimit: number;
}

export interface Level3 {
  Level: number;
  FloorLimit: number;
  ServantLimit: number;
}

export interface Level4 {
  Level: number;
  FloorLimit: number;
  ServantLimit: number;
}

export interface PlayerInteractionSettings {
  TimeZone: string;
  VSPlayerWeekdayTime: VsplayerWeekdayTime;
  VSPlayerWeekendTime: VsplayerWeekendTime;
  VSCastleWeekdayTime: VscastleWeekdayTime;
  VSCastleWeekendTime: VscastleWeekendTime;
}

export interface VsplayerWeekdayTime {
  StartHour: number;
  StartMinute: number;
  EndHour: number;
  EndMinute: number;
}

export interface VsplayerWeekendTime {
  StartHour: number;
  StartMinute: number;
  EndHour: number;
  EndMinute: number;
}

export interface VscastleWeekdayTime {
  StartHour: number;
  StartMinute: number;
  EndHour: number;
  EndMinute: number;
}

export interface VscastleWeekendTime {
  StartHour: number;
  StartMinute: number;
  EndHour: number;
  EndMinute: number;
}
