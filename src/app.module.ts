import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config'
import { VideoModule } from './videos/video.module';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/guards/roles.guard';
import { PlaylistModule } from './playlists/playlist.module';
import { Video } from './videos/entities/video.entity';
import { Playlist } from './playlists/entities/playlist';
import { User } from './users/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Video, Playlist, User],
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
    PlaylistModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
