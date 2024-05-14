import BaseInterface from "../base.interface";
import SubscriptionInterface from "../subscription/subscription.interface";

export interface UserInterface extends BaseInterface {
  name: string;
  email: string;
  password: string;
  active: boolean;
  phone: string;
  positionRole: string;
  subscription?: SubscriptionInterface;
}