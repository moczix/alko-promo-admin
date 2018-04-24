export interface  AlcoholUpdateModel {
  name: string;
  description: string;
  voltage: number;
  capacity: number;
  imageUrl: string;
  categoryId: number;
  accepted: boolean;
  selectedTags: Array<number>;
}
