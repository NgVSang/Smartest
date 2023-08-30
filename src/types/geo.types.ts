export interface IPrediction {
  description: string;
  matched_substrings: {
    length: number;
    offset: number;
  }[];
  place_id: string;
  reference: string;
  structured_formatting: {
    main_text: string;
    main_text_matched_substrings: {
      length: number;
      offset: number;
    }[];
    secondary_text: string;
    secondary_text_matched_substrings: {
      length: number;
      offset: number;
    }[];
  };
  has_children: boolean;
  plus_code: {
    compound_code: string;
    global_code: string;
  };
  compound: {
    district: string;
    commune: string;
    province: string;
  };
  terms: {offset: number; value: string}[];
  types: string;
  distance_meters?: number;
}

export interface IDistance {
  text: string;
  value: number;
}

export interface IPosition {
  place_id: string;
  coordinate: {
    latitude: number;
    longitude: number;
  };
  description?: string;
  distance?: IDistance;
}
