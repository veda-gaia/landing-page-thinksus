import { SubscriptionPermissionsEnum } from "src/app/enums/subscription-permissions.enum";
import BaseInterface from "../base.interface";

export default interface SubscriptionInterface extends BaseInterface {
  name: string;
  amount: number;
  description: string;
  active: boolean;
  permissions: SubscriptionPermissionsEnum[];
}