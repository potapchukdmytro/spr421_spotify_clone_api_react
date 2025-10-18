﻿using AutoMapper;
using spr421_spotify_clone.BLL.Dtos.Track;
using spr421_spotify_clone.DAL.Entities;

namespace spr421_spotify_clone.BLL.MapperProfiles
{
    public class TrackProfile : Profile
    {
        public TrackProfile()
        {
            // CreateTrackDto -> TrackEntity
            CreateMap<CreateTrackDto, TrackEntity>()
                .ForMember(dest => dest.AudioUrl, opt => opt.MapFrom(src => string.Empty))
                .ForMember(dest => dest.GenreId, opt => opt.Ignore())
                .ForMember(dest => dest.ReleaseDate, opt => opt.MapFrom(src => src.ReleaseDate.ToUniversalTime()));

            // TrackEntity -> TrackDto
            CreateMap<TrackEntity, TrackDto>()
                .ForMember(dest => dest.Genre, opt => opt.MapFrom(src => src.Genre));
        }
    }
}
