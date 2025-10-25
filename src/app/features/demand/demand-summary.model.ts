import { DemandPriority } from "@core/enums/demandPriority";
import { DemandStatus } from "@core/enums/demandStatus";
import { DemandType } from "@core/enums/demandType";

export interface DemandSummary {
    id: number;
    subject:string;
    description: string;
    priority: DemandPriority;
    status: DemandStatus;
    demandType: DemandType;
    createdDate: Date;
    createdByUserName: string;
    centerName?: string | null;
}
