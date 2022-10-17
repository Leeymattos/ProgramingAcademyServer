import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ObjectId } from "mongodb";
import { Video } from "src/videos/entities/video.entity";
import { DeleteResult, ILike, MongoRepository } from "typeorm";

@Injectable()
export class VideoService {

    constructor(
        @InjectRepository(Video)
        private videoRepository: MongoRepository<Video>
    ) { }

    async create(video: Video): Promise<Video> {
        return await this.videoRepository.save(video);
    }

    async findAll(): Promise<Video[]> {
        return await this.videoRepository.find();
    }

    async findById(id: string): Promise<Video> {

        const video = await this.videoRepository.findOneBy({
            _id: new ObjectId(id)
        })

        if (!video) {
            throw new HttpException('Video não encontrado!', HttpStatus.NOT_FOUND);
        }

        return video;
    }

    async findByTitle(title: string): Promise<Video[]> {

        console.log(title);

        return await this.videoRepository.find({
            where: {
                title: ILike(`%${title}%`)
            }
        });
    }

    async update(video: Video): Promise<Video> {


        const videoExists = await this.findById(String(video._id));

        if (!videoExists || !video._id) {
            throw new HttpException('', HttpStatus.NOT_FOUND);
        }

        return await this.videoRepository.save(video);
    }

    async delete(id: string): Promise<DeleteResult> {

        const videoExists = await this.findById(id);

        if (!videoExists) {
            throw new HttpException('Video não encontrado!', HttpStatus.NOT_FOUND);
        }

        return await this.videoRepository.delete(id);
    }

}