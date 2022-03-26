import { Product } from "../entities/product.model";
// import * as creds from '../../../../../../credentials.json';
import { google } from 'googleapis';
import { Nomenclature, Material } from "../dto/create-product.input";
import { Injectable } from "@nestjs/common";
import { Barcode } from "../entities/barcode.model";
import { ProductColorMatcher } from "./color.dictionary";
import { environment } from '../../../environments/environment';

const jwt_readonly = new google.auth.JWT({
  email: Buffer.from(environment.GOOGLE_CLIENT_EMAIL!, 'base64').toString('ascii'),
  key: Buffer.from(environment.GOOGLE_PRIVATE_KEY!, 'base64').toString('ascii'),
  scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly']
});
const Sheets = google.sheets('v4')

@Injectable()
export class GoogleServices{
  private ProductsSheetId = '1AkXNDo2r-XKtogdABWpNYZq40XcR93JIohNEYQc5mfM';
  async getBarcodes(): Promise<Barcode[]>{
    const response = await Sheets.spreadsheets.values.get({
      spreadsheetId: this.ProductsSheetId,
      range: 'db_barcode!A:Z',   //exclude first column
      auth: jwt_readonly
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
          const colorGroup = ProductColorMatcher[color]
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
      auth: jwt_readonly
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
        const colorGroup = ProductColorMatcher[color]
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
}