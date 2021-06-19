/* eslint-disable camelcase */
import { BaseRequest } from 'api';

export interface Drug {
  id: number;
  modified_date: Date;
  created_date: Date;
  obj_key: string;
  product_number: string;
  name: string;
  inter_name: string;
  med_dose: string;
  packaging: string;
  specification: string;
  term_issuance: string;
  manu_name: string;
  country: string;
  valid_date: string;
  supplier: string;
  barcode: string;
  status: string;
  licemed_item_dtl?: {
    id: number;
    modified_date: Date;
    created_date: Date;
    licemed_item?: any;
    LicemedItemID: number;
    title: string;
    image: string;
    content: string;
    images: any[];
  };
}

export interface Category {
  id: number;
  modified_date: Date;
  created_date: Date;
  code: string;
  name: string;
  description: string;
  is_active: boolean;
  med_items?: any;
  created_user_id: number;
  modified_user_id: number;
  created_user?: any;
  modified_user?: any;
}
export interface ReturnBase {
  body: any;
  error_msg: string;
  status_code: number;
}
// http://103.50.204.55:8081/api/v1/licemed/search/{name}
const searchDrugs: (name: string) => Promise<Drug[]> = async (name) => {
  const drugs = (await BaseRequest({
    url: `licemed/search/${name}`,
    method: 'GET',
  })) as ReturnBase;

  return drugs.body as Drug[];
};

const getDrugDetail: (id: string) => Promise<Drug> = async (id) => {
  const drugs = (await BaseRequest({
    url: `licemed/${id}`,
    method: 'GET',
  })) as ReturnBase;

  return drugs.body as Drug;
};

const getDrugCategories: () => Promise<Category[]> = async () => {
  const drugs = (await BaseRequest({
    url: `licemed/classes`,
    method: 'GET',
  })) as ReturnBase;

  return drugs.body as Category[];
};

const searchDrugCategories: (code: string) => Promise<Drug[]> = async (
  code,
) => {
  const drugs = (await BaseRequest({
    url: `licemed/search/class/${code}`,
    method: 'GET',
  })) as ReturnBase;

  return drugs.body as Drug[];
};

export default {
  searchDrugs,
  getDrugDetail,
  getDrugCategories,
  searchDrugCategories,
};
