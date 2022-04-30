import { UserMail } from './UserMail';

export enum PlanType {
  Free = 'free',
  Paid = 'paid',
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

export interface PlanConfigItem<T = any> {
  name: string;
  value: T;
}

export interface ActivePlanResponse extends Plan {
  configs: PlanConfigItem[];
}

export class ActivePlan {
  private data: ActivePlanResponse;

  id = -1;
  name = '';
  description = '';
  plan_type = PlanType.Free;
  monthly_price = 0;

  is_free = true;
  mails = 2;
  allow_custom_redirect = false;
  allow_resend_mails = true;
  days_until_user_can_delete_account = 15;

  constructor(data: ActivePlanResponse) {
    this.data = data;

    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.plan_type = data.plan_type;
    this.monthly_price = data.monthly_price;

    this.is_free = data.plan_type === PlanType.Free;

    this.mails = this.getPropertyFromData('mails', 2);
    this.allow_custom_redirect = this.getPropertyFromData(
      'allow_custom_redirect',
      false
    );
    this.allow_resend_mails = this.getPropertyFromData(
      'allow_resend_mails',
      true
    );
    this.days_until_user_can_delete_account = this.getPropertyFromData(
      'days_until_user_can_delete_account',
      15
    );
  }

  private getPropertyFromData<T>(name: string, defaultValue: T): T {
    const propertyItem = this.data.configs.find(item => item.name === name);
    if (!propertyItem) {
      return defaultValue;
    }
    return propertyItem.value as T;
  }

  canDeleteUserMail(mail: UserMail) {
    const createdDate = new Date(mail.created_at);
    const currentDate = new Date();
    const difference_time = currentDate.getTime() - createdDate.getTime();

    const difference_days = Math.floor(difference_time / (1000 * 3600 * 24));

    return difference_days > this.days_until_user_can_delete_account;
  }
}
