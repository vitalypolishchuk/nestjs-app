import { applyDecorators } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";

export function SaveMessageSwagger() {
    return applyDecorators(
      ApiOperation({ summary: 'Save and send a message to the recipient' }),
      ApiResponse({ status: 200, description: 'Message saved and sent successfully' }),
      ApiResponse({ status: 404, description: 'Recipient not found' }),
      ApiResponse({ status: 500, description: 'Internal server error' }),
    );
  }