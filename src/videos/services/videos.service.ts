import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PlaylistService } from "src/playlists/services/playlist.service";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Video } from "../entities/video.entity";

@Injectable()
export class VideoService {

    constructor(
        @InjectRepository(Video)
        private videoRepository: Repository<Video>,
        private playlistService: PlaylistService
    ) { }

    async create(video: Video): Promise<Video> {
        if (!video.playlist || !video.playlist.id) {
            throw new HttpException('Categoria não encontrada!', HttpStatus.BAD_REQUEST)
        }

        await this.playlistService.findById(video.playlist.id);

        return await this.videoRepository.save(video);
    }

    async findAll(): Promise<Video[]> {
        return await this.videoRepository.find({
            relations: {

            }
        });
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

    async findByPlaylist(playlistId: string): Promise<Video[]> {
        return await this.videoRepository.find({
            where: {
                id: playlistId
            }
        });
    }

    async update(video: Video): Promise<Video> {


        const videoExists = await this.findById(video.id);

        if (!videoExists || !video.id) {
            throw new HttpException('Video não encontrado!', HttpStatus.NOT_FOUND);
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