import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Video } from './videos/entities/video.entity';
import { ConfigModule } from '@nestjs/config'
import { VideoModule } from './videos/video.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.sjmo4pq.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      entities: [Video]
    }),
    VideoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
