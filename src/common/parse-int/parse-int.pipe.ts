import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    // valor en base 10
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new BadRequestException(`${value} no es un entero`);
    }
    return val;
  }
}
