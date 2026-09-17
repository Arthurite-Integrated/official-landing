import type {ServiceItem} from "#/lib/services-data.ts";
import {SERVICES_BATCH_1} from "#/lib/services-items-batch1.ts";
import {SERVICES_BATCH_2} from "#/lib/services-items-batch2.ts";

export const SERVICES_DATA: readonly ServiceItem[] = [...SERVICES_BATCH_1, ...SERVICES_BATCH_2];
