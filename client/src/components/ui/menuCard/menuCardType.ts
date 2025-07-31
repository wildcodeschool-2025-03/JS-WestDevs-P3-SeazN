export interface MenuCardType {
  id: number;
  label: string;
  isAvailable: boolean;
  path: string;
}

export type MenuCardList = MenuCardType[];
