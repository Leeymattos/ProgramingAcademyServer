import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config'
import { VideoModule } from './videos/video.module';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/guards/roles.guard';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/**/*.entity{.js,.ts}'],
      synchronize: true
    }),
    /*  TypeOrmModule.forRoot({
       type: 'postgres',
       url: process.env.DATABASE_URL,
       logging: false,
       dropSchema: false,
       ssl: {
         rejectUnauthorized: false
       },
       synchronize: true,
       autoLoadEntities: true
     }), */
    VideoModule,
    UserModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
