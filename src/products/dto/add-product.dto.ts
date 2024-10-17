import { ProductType } from 'src/models/product.model';
import { IsNotEmpty } from 'class-validator';


export class AddProductDto {
    @IsNotEmpty()
    productName: string;

    @IsNotEmpty()
    productType: ProductType;
}