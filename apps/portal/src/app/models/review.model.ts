export class ReviewModel {
  public image_path: string;
  public author: string;
  public rating: number;
  public review_text: string
  public sku: string;
  public wb_id: string;
  public product_title: string;

  constructor(data: ReviewModel) {
    this.image_path = data.image_path;
    this.author = data.author;
    this.rating = data.rating;
    this.review_text = data.review_text; 
    this.sku = data.sku;
    this.wb_id = data.wb_id;
    this.product_title = data.product_title;
  }
}
