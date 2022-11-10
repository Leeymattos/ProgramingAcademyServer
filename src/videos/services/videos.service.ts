import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Video } from "../entities/video.entity";

@Injectable()
export class VideoService {

    constructor(
        @InjectRepository(Video)
        private videoRepository: Repository<Video>
    ) { }

    async create(video: Video): Promise<Video> {
        return await this.videoRepository.save(video);
    }

    async findAll(): Promise<Video[]> {
        return await this.videoRepository.find();
    }

    async findById(id: string): Promise<Video> {

        const video = await this.videoRepository.findOneBy({ id })

        if (!video) {
            throw new HttpException('Video não encontrado!', HttpStatus.NOT_FOUND);
        }

        return video;
    }

    async findByTitle(title: string): Promise<Video[]> {

        return await this.videoRepository.find({
            where: {
                title: ILike(`%${title}%`)
            }
        });
    }

    async update(video: Video): Promise<Video> {


        const videoExists = await this.findById(String(video.id));

        if (!videoExists || !video.id) {
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