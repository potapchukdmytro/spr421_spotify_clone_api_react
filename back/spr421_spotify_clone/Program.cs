using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using spr421_spotify_clone.BLL.Services.Auth;
using spr421_spotify_clone.BLL.Services.Genre;
using spr421_spotify_clone.BLL.Services.Storage;
using spr421_spotify_clone.BLL.Services.Track;
using spr421_spotify_clone.BLL.Settings;
using spr421_spotify_clone.DAL;
using spr421_spotify_clone.DAL.Entities.Identity;
using spr421_spotify_clone.DAL.Initializer;
using spr421_spotify_clone.DAL.Repositories.Genre;
using spr421_spotify_clone.DAL.Repositories.Track;
using spr421_spotify_clone.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();

// Add dbcontext
builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultDb"));
});

// Add identity
builder.Services.AddIdentity<ApplicationUser, ApplicationRole>(options =>
{
    options.User.RequireUniqueEmail = true;

    options.Password.RequiredUniqueChars = 0;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequireDigit = false;
    options.Password.RequireLowercase = false;
    options.Password.RequireUppercase = false;
    options.Password.RequiredLength = 6;
})
    .AddDefaultTokenProviders()
    .AddEntityFrameworkStores<AppDbContext>();

// Add automapper
builder.Services.AddAutoMapper(options =>
{
    options.LicenseKey = builder.Configuration["Automapper:LicenseKey"];
}, AppDomain.CurrentDomain.GetAssemblies());

// Add repositories
builder.Services.AddScoped<IGenreRepository, GenreRepository>();
builder.Services.AddScoped<ITrackRepository, TrackRepository>();

// Add services
builder.Services.AddScoped<IGenreService, GenreService>();
builder.Services.AddScoped<ITrackService, TrackService>();
builder.Services.AddScoped<IStorageService, StorageService>();
builder.Services.AddScoped<IAuthService, AuthService>();

// Add configuration
builder.Services.Configure<JwtSettings>(builder.Configuration.GetSection("JwtSettings"));

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add cors
string corsPolicy = "allowall";
builder.Services.AddCors(options =>
{
    options.AddPolicy(corsPolicy, builder =>
    {
        builder
        .AllowAnyOrigin()
        .AllowAnyHeader()
        .AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

// Static files
app.AddStaticFiles(app.Environment);

app.MapControllers();

app.UseCors(corsPolicy);

app.Seed();

app.Run();
