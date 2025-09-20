using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using spr421_spotify_clone.DAL.Repositories.Genre;

namespace spr421_spotify_clone.Controllers
{
    [ApiController]
    [Route("api/genre")]
    public class GenreController : ControllerBase
    {
        private readonly IGenreRepository _genreRepository;

        public GenreController(IGenreRepository genreRepository)
        {
            _genreRepository = genreRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAsync()
        {
            var entities = await _genreRepository.Genres.ToListAsync();
            return Ok(entities);
        }
    }
}
