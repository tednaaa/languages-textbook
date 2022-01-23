import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 8080;

  app.use(cookieParser());

  await app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}/graphql`));
}

bootstrap();
