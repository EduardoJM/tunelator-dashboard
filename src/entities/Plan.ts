export enum PlanType {
    Free = "free",
    Paid = "paid",
}

export interface PlanFeature {
    name: string;
    enabled: boolean;
}

export interface Plan {
    id: number;
    display_features: PlanFeature[];
    name: string;
    description: string;
    plan_type: PlanType;
    monthly_price: number;
}
