import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";
import { Playlist } from "../entities/playlist";

@Injectable()
export class PlaylistService {
    constructor(
        @InjectRepository(Playlist)
        private playlistRepository: Repository<Playlist>
    ) { }

    async findAll(): Promise<Playlist[]> {
        return await this.playlistRepository.find();
    }

    async findById(id: string): Promise<Playlist> {
        const playlist = this.playlistRepository.findOneBy({ id });


        if (!playlist) {
            throw new HttpException('Playlist não encontrada!', HttpStatus.BAD_REQUEST);
        }

        return playlist;
    }

    async create(playlist: Playlist): Promise<Playlist> {
        return await this.playlistRepository.save(playlist);
    }

    async update(playlist: Playlist): Promise<Playlist> {
        const playlistExists = await this.playlistRepository.findOneBy({ id: playlist.id });

        if (!playlistExists || !playlist.id) {
            throw new HttpException('Playlist não encontrada!', HttpStatus.NOT_FOUND);
        }

        return await this.playlistRepository.save(playlist);
    }

    async delete(id: string): Promise<DeleteResult> {
        const playlistExists = await this.playlistRepository.findOneBy({ id });

        if (!playlistExists) {
            throw new HttpException('Playlist não encontrada!', HttpStatus.NOT_FOUND);
        }

        return this.playlistRepository.delete(id);
    }
}