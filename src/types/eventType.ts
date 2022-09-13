export type EventSimpleType = {
  id: number;
  name: string;
  image: string;
  description: string;
  salesFrom: number;
  salesTo: number;
  saleStatus: '판매중' | '매진' | '판매종료';
};

export interface EventDetailType extends EventSimpleType {
  artistName: string;
  artistImage: string;
  twitterUrl: string;
  instagramUrl: string;
  webpageUrl: string;
  totalTicketCount: number;
  onSaleTicketCount: number;
  startTime: number;
  endTime: number;
  price: number;
  location: string;
  salesOption: 'FLAT_PRICE' | 'FLEXIBLE_PRICE'; // FLAT_PRICE(균일가), FLEXIBLE_PRICE(균일가 아님)
  contractAddress: string;
  openseaUrl: string;
}
