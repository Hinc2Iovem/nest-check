import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { ValidationException } from "src/exceptions/validation.exception";

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    if (!metadata.metatype || this.isPrimitive(metadata.metatype)) {
      return value;
    }

    const obj = plainToInstance(metadata.metatype, value);
    const errors = await validate(obj);

    if (errors.length) {
      const messages = errors.map((e) => {
        const constraints = e.constraints ? Object.values(e.constraints).join(", ") : "Validation failed";
        return `${e.property} - ${constraints}`;
      });
      throw new ValidationException(messages);
    }
    return value;
  }

  private isPrimitive(type: any): boolean {
    const primitiveTypes = [String, Boolean, Number, Array, Object];
    return primitiveTypes.includes(type);
  }
}
