import {CategoryModel} from './category.model';
import {UserModel} from './user.model';

interface TagModel {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;

}

interface AlcoholTagModel {
  id: number;
  alcoholId: number;
  tagId: number;
  createdAt: string;
  updatedAt: string;
  tag ?: TagModel;
}

export interface AlcoholModel {
  id: number;
  accepted: number;
  barcode: string;
  capacity: number;

  categoryId: number;
  image: string;
  name: string;
  voltage: number;
  description: string;
  ocenPiwoUrl: string;


  createdAt: string;
  updatedAt: string;

  category?: CategoryModel;
  user?: UserModel;
  tags?: Array<AlcoholTagModel>;
}
