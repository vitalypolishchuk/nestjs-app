import { ProductType } from 'src/models/product.model';
import { IsEnum, IsNotEmpty } from 'class-validator';


export class AddProductDto {
    @IsNotEmpty()
    productName: string;

    @IsNotEmpty()
    @IsEnum(["Electronics", "Clothing", "Home Appliances", "Beauty Products", "Sporting Goods"], {
        message: `productType must be one of the following values: Electronics, Clothing, Home Appliances, Beauty Products, Sporting Goods`
    })
    productType: ProductType;
}