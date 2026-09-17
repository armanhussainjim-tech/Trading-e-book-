import { StrategyModule, TradingStrategy } from '../types';
import { USER_10_EBOOK_MODULES } from './userModules';
import { buildFull100StrategiesCatalog } from './fullCatalogGenerator';

export const EBOOK_MODULES: StrategyModule[] = USER_10_EBOOK_MODULES;

export const INITIAL_STRATEGIES: TradingStrategy[] = buildFull100StrategiesCatalog();
