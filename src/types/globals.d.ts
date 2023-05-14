type APODData = {
  date: string;
  explanation: string;
  hdurl: string;
  media_type: string;
  service_version: string;
  title: string;
  url: string;
};

interface APODImg extends APODData {
  media_type: 'image';
}

interface Card {
  id: number;
  image: APODImg;
  key: string;
  isSelected: boolean;
  foundMatch: boolean;
}

type ApiError = {
  code: string;
  message: string;
};
