import { DemandPriority } from "@core/enums/demandPriority";
import { DemandStatus } from "@core/enums/demandStatus";
import { DemandType } from "@core/enums/demandType";

export interface DemandCreate {
  subject: string;
  description: string;
  startDate: Date;
  finishDate: Date;
  priority: DemandPriority;
  status: DemandStatus;
  demandType: DemandType;
  demandedUserId?: number | null;
}
