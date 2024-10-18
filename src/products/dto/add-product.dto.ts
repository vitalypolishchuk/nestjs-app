import { ApiProperty } from '@nestjs/swagger';
import { ProductType } from 'src/models/product.model';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class AddProductDto {
    @ApiProperty({
        description: 'The name of the product',
        example: 'Smartphone',
    })
    @IsNotEmpty()
    productName: string;

    @ApiProperty({
        description: 'The type of the product',
        enum: ['Electronics', 'Clothing', 'Home Appliances', 'Beauty Products', 'Sporting Goods'],
        example: 'Electronics',
    })
    @IsNotEmpty()
    @IsEnum(["Electronics", "Clothing", "Home Appliances", "Beauty Products", "Sporting Goods"], {
        message: `productType must be one of the following values: Electronics, Clothing, Home Appliances, Beauty Products, Sporting Goods`
    })
    productType: ProductType;
}
