export interface  AlcoholUpdateModel {
  name: string;
  description: string;
  voltage: number;
  capacity: number;
  imageUrl: string;
  categoryId: number;
  accepted: boolean;
  ocenPiwoUrl?: string;
  selectedTags: Array<number>;
}
