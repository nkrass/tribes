import { Product } from "../product/entities/product.model";
// import * as creds from '../../../../../../credentials.json';
import { google } from 'googleapis';
import { Nomenclature, Material } from "../product/dto/create-product.input";
import { v4 } from 'uuid';
import { ConsoleLogger, Injectable } from "@nestjs/common";
import { Barcode } from "../product/entities/barcode.model";
import { environment } from '../../environments/environment';
import { Review } from "../review/entities/review.model";
import { ColorsDictionary } from "libs/colors-dictionary/src";
import { ProductGender } from "../product/entities/product-gender.enum";
import { ProductCategory } from "../product/entities/product-category.enum";

const auth = new google.auth.JWT({
  email: Buffer.from(environment.GOOGLE_CLIENT_EMAIL as string, 'base64').toString('ascii'),
  key: Buffer.from(environment.GOOGLE_PRIVATE_KEY as string, 'base64').toString('ascii'),
  scopes: ['https://www.googleapis.com/auth/spreadsheets']
});
const Sheets = google.sheets('v4')

@Injectable()
export class GoogleServices{
  private ProductsSheetId = '1AkXNDo2r-XKtogdABWpNYZq40XcR93JIohNEYQc5mfM';
  private ReviewsSheetId = '1o3XTrKFSI-4GVfoC7kUb701bnzl15qD7ehtWX7TI9O0';
  async updateProduct(product: Product) {
    const response = await Sheets.spreadsheets.values.get({
      spreadsheetId: this.ProductsSheetId,
      range: 'db!A:T',   //exclude first column
      auth
    })
    const rows = response.data.values
    if (!rows) throw new Error('Error in retrieving data')
    const indexOfProduct = rows.map(r => r[2]).indexOf(String(product.wildberriesId))
    const rowToUpdate = rows[indexOfProduct]
      rowToUpdate[4] = product.description? product.description : rowToUpdate[4] //desc
      rowToUpdate[5] = product.description? product.description : rowToUpdate[5] //desc short
      rowToUpdate[8] = product.category? (product.category != ProductCategory.unset? product.category : rowToUpdate[8]) : rowToUpdate[8] //cat
      rowToUpdate[9] = product.tags? product.tags : rowToUpdate[9] //tags
      rowToUpdate[10] = product.collection? product.collection : rowToUpdate[10] //colection
      rowToUpdate[11] = product.color? ColorsDictionary.getColorName(product.color) : rowToUpdate[11] //color 
      rowToUpdate[12] = product.materials.length? product.materials.map(e => `${e.material} ${e.quantity}%`).join(',') : rowToUpdate[12] //materials,
      rowToUpdate[13] = product.gender? (product.gender != ProductGender.unset? product.gender : rowToUpdate[13]) : rowToUpdate[13] //geder
      rowToUpdate[14] = product.images? product.images.join(',') : rowToUpdate[14] //image paths
      rowToUpdate[15] = product.videos? product.videos.join(',') : rowToUpdate[15] //vide paths
      rowToUpdate[16] = product.crossSale? product.crossSale.join(',') : rowToUpdate[16] //cross sale
      rowToUpdate[17] = product.manufactured? product.manufactured : rowToUpdate[17] //manufact
      rowToUpdate[18] = product.notes? product.notes : rowToUpdate[18] //notes
      rowToUpdate[19] = product.sizes? product.sizes : rowToUpdate[19] //sizes
    // try {
    rows[indexOfProduct] = rowToUpdate
    const result = Sheets.spreadsheets.values.update({
        spreadsheetId: this.ProductsSheetId,
        // range: `db!A${indexOfProduct+1}:T${indexOfProduct+1}`,
        range: 'db!A:T',
        valueInputOption: 'USER_ENTERED',
        requestBody: { values: rows },
        auth
      })
    const check = await Sheets.spreadsheets.values.get({
      spreadsheetId: this.ProductsSheetId,
      range: `db!A${indexOfProduct+1}:T${indexOfProduct+1}`,   //exclude first column
      auth
    })

    return check;
  }
  async getBarcodes(): Promise<Barcode[]>{
    const response = await Sheets.spreadsheets.values.get({
      spreadsheetId: this.ProductsSheetId,
      range: 'db_barcode!A:Z',   //exclude first column
      auth
    })
    const rows = response.data.values
    const barcodes: Barcode[] = []
    if (rows){
      for (let i = 1; i < rows.length; i++){
        const row = rows[i]
        //filter out non categorized
        const barcode_key = row[0].toLowerCase()
        if (!barcodes.map(e=> e.barcode).includes(barcode_key)){
          const color = barcode_key.slice(11,13)
          const colorGroup = ColorsDictionary.matchColorToGroup(color)
          const barcode = new Barcode();
            barcode.sku = row[2].toLowerCase()
            barcode.barcode = barcode_key
            barcode.size = row[7]
            barcode.stock = parseInt(row[8],10) || 0
            barcode.status = row[15];
            barcode.category = row[16].split(',').map((s: string) => (s.trim() === '#N/A' || s.trim() === '')? 'unset' : s.trim())[0]
            barcode.gender = row[17].split(',').map((s: string) => (s.trim() === '#N/A' || s.trim() === '')? 'unset' : s.trim())[0]
            barcode.wildberriesId = row[22]? parseInt(row[22],10) : 0
            barcode.categoryGenderColorSize = `${barcode.category}#${barcode.gender}#${colorGroup}#${barcode.size}`
            barcode.categoryGenderSize = `${barcode.category}#${barcode.gender}#${barcode.size}`
            barcode.genderColorSize = `${barcode.gender}#${colorGroup}#${barcode.size}`
            barcode.genderSize = `${barcode.gender}#${barcode.size}`
            barcode.genderColor = `${barcode.gender}#${colorGroup}`
            barcode.categorySize = `${barcode.category}#${barcode.size}`
            barcode.categoryGender = `${barcode.category}#${barcode.gender}`

            const title_full = row[9]
            const title_full_arr = title_full?.split('/') || [title_full]
            const title = String(title_full_arr[title_full_arr.length - 1]).trim() // take the last
            //filter out non categorized
            barcode.skuFamily = row[2].slice(0,11).toLowerCase()
            barcode.nomenclature = {} as Nomenclature
            barcode.nomenclature.name = row[3]
            barcode.nomenclature.tnvd = row[4]
            barcode.nomenclature.cost = parseInt(row[5], 10) || 0
            barcode.nomenclature.price = parseInt(row[6], 10) || 0
            barcode.title = title
            barcode.titleFull = title_full
            barcode.description = row[10]
            barcode.descriptionSeo = row[10]
            barcode.color = color
            barcode.colorGroup = colorGroup
            barcode.materials = row[12]?.split(',').map((s: string) => { const el = s.trim().split(" "); if (el[0]==='#N/A' || el[0]==='') { return } else return {material: el[0], quantity: parseInt(el[1],10) || 0} as Material }).filter((_: any) => !!_)
            barcode.priceBase = parseInt(row[13],10) || 0;
            barcode.priceSale = parseInt(row[14],10) || 0;
            barcode.tags = row[18]
            barcode.collection = row[19]
            barcode.images = row[20]?.split(',').map((s: string) => s.trim()).filter((_: any) => !!_)
            barcode.videos = row[21]?.split(',').map((s: string) => s.trim()).filter((_: any) => !!_)
            barcode.crossSale = row[23]?.split(',').map((s: string) => s.trim()).filter((_: any) => !!_)
            barcode.manufactured = row[24]
            barcode.notes = row[25]

          barcodes.push(barcode)
        }
      }
    }
    return barcodes;
  }
  async getProducts(): Promise<Product[]>{
    const response = await Sheets.spreadsheets.values.get({
      spreadsheetId: this.ProductsSheetId,
      range: 'db_barcode!A:Z',   //exclude first column
      auth
    })
    const rows = response.data.values
    const products: Product[] = []
    const stock_per_sku: {[string: string]: number} = {}
    const size_per_sku: {[string: string]: string} = {}
    if (rows){
      for (let i = 1; i < rows.length; i++){
        const row = rows[i]
        const title_full = row[9]
        const title_full_arr = title_full?.split('/') || [title_full]
        const title = String(title_full_arr[title_full_arr.length - 1]).trim() // take the last
        //filter out non categorized
        const product_key = row[2].toLowerCase()
        const color = product_key.slice(11,13)
        const colorGroup = ColorsDictionary.matchColorToGroup(color)
        const stock = parseInt(row[8],10) || 0
        const size = row[7]
        size_per_sku[product_key]? size_per_sku[product_key] += `,${size}` : size_per_sku[product_key] = `${size}`
        stock_per_sku[product_key]? stock_per_sku[product_key] += stock : stock_per_sku[product_key] = stock

        if (!products.map(e => e.sku).includes(product_key)){
          const product = new Product();
            product.sku = product_key
            product.skuFamily = row[2].slice(0,11).toLowerCase()
            product.nomenclature = {} as Nomenclature
            product.nomenclature.name = row[3]
            product.nomenclature.tnvd = row[4]
            product.nomenclature.cost = parseInt(row[5], 10) || 0
            product.nomenclature.price = parseInt(row[6], 10) || 0
            product.title = title
            product.titleFull = title_full
            product.description = row[10]
            product.descriptionSeo = row[10]
            product.color = color//row[11]
            product.colorGroup = colorGroup
            product.materials = row[12].split(',').map((s: string) => { const el = s.trim().split(" "); if (el[0]==='#N/A' || el[0]==='') { return } else return {material: el[0], quantity: parseInt(el[1],10) || 0} as Material }).filter((_: any) => !!_)
            product.priceBase = parseInt(row[13],10) || 0;
            product.priceSale = parseInt(row[14],10) || 0;
            product.status = row[15];
            product.category = row[16]?.split(',').map((s: string) => (s.trim() === '#N/A' || s.trim() === '')? 'unset' : s.trim())[0]
            product.gender = row[17]?.split(',').map((s: string) => (s.trim() === '#N/A' || s.trim() === '')? 'unset' : s.trim())[0]
            product.tags = row[18]
            product.collection = row[19]
            product.images = row[20]?.split(',').map((s: string) => s.trim()).filter((_: any) => !!_)
            product.videos = row[21]?.split(',').map((s: string) => s.trim()).filter((_: any) => !!_)
            product.wildberriesId = row[22]? parseInt(row[22],10) : 0
            product.crossSale = row[23]?.split(',').map((s: string) => s.trim()).filter((_: any) => !!_)
            product.manufactured = row[24]
            product.notes = row[25]
            product.createdAt = new Date()
            
            product.categoryGenderColor = `${product.category}#${product.gender}#${colorGroup}`
            product.categoryGender = `${product.category}#${product.gender}`
            product.categoryColor = `${product.category}#${colorGroup}`
            product.genderColor = `${product.gender}#${colorGroup}`
          products.push(product)
        }
      }
    }
    products.forEach((e) => { 
      e.stock = stock_per_sku[e.sku]
      e.sizes = size_per_sku[e.sku]
      e.skuIndex = e.wildberriesId
      e.stockBySkuIndex = e.stock? e.skuIndex : 0
    })
    return products
  }
  
  async getAllReviews() {
    const response = await Sheets.spreadsheets.values.get({
      spreadsheetId: this.ReviewsSheetId,
      range: 'reviews!A:G',
      auth
    })
    const rows = response.data.values
    const reviews: Review[] = []
    if (rows){
      for (let i = 1; i < rows.length; i++){
        const row = rows[i]
        if (row[0] && row[1]){
          const review = new Review();
          review.id = v4()
          review.sku = row[1].toLowerCase()
          review.skuFamily = row[1].slice(0,11).toLowerCase()
          review.reviewRating = row[2] ? Number(row[2]) : 5
          review.reviewAuthor = row[3]? row[3] : ''
          review.reviewText = row[4]? row[4] : ''
          review.reviewAnswer = row[5]? row[5] : ''
          review.reviewDate = row[6]? new Date(row[6]) : new Date()
          review.visible = row[13]? (row[13]==='FALSE'? false : true) : true
          review.promoRating = (review.visible && review.reviewRating >= 4)? "promo" : "regular"
          review.createdAt = review.reviewDate
          //filter out non categorized
          reviews.push(review)
        }
      }
    }
    return reviews
  }
}