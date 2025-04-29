var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod());
});

var app = builder.Build();
app.UseCors();

// “Databas”
var cars = new List<Car>
{
    new Car { Id = 1, Brand = "Honda",  Model = "Civic",   Year = 2020, OptimalToe =  0.5f, OptimalCamber = -0.3f },
    new Car { Id = 2, Brand = "Ford",   Model = "Mustang", Year = 2021, OptimalToe =  0.2f, OptimalCamber = -0.1f },
    new Car { Id = 3, Brand = "Toyota", Model = "Corolla", Year = 2019, OptimalToe =  0.3f, OptimalCamber = -0.2f },
};

// GET all cars
app.MapGet("/cars", () => cars);

// GET measurements
app.MapGet("/cars/{id:int}/measurements", (int id) =>
{
    var car = cars.FirstOrDefault(c => c.Id == id);
    if (car is null) return Results.NotFound();

    var rand = new Random();

    float Offset() => (float)(rand.NextDouble() * 2 - 1) * 3.0f; // ±3°

    return Results.Ok(new
    {
        car.Id,
        car.Brand,
        car.Model,
        car.Year,
        car.OptimalToe,
        car.OptimalCamber,
        LeftToe     = car.OptimalToe    + Offset(),
        RightToe    = car.OptimalToe    + Offset(),
        LeftCamber  = car.OptimalCamber + Offset(),
        RightCamber = car.OptimalCamber + Offset(),
    });
});

// POST a new car
app.MapPost("/cars", (CreateCarDto dto) =>
{
    var nextId = cars.Any() ? cars.Max(c => c.Id) + 1 : 1;
    var newCar = new Car
    {
        Id            = nextId,
        Brand         = dto.Brand,
        Model         = dto.Model,
        Year          = dto.Year,
        OptimalToe    = dto.OptimalToe,
        OptimalCamber = dto.OptimalCamber
    };
    cars.Add(newCar);
    return Results.Created($"/cars/{newCar.Id}", newCar);
});

// DELETE /cars/{id}
app.MapDelete("/cars/{id:int}", (int id) =>
{
    var car = cars.FirstOrDefault(c => c.Id == id);
    if (car is null) return Results.NotFound();
    cars.Remove(car);
    return Results.NoContent();
});

app.Urls.Clear();
app.Urls.Add("http://localhost:5236");
app.Run();

public partial class Program { }

public record Car
{
    public int    Id            { get; init; }
    public string Brand         { get; init; } = string.Empty;
    public string Model         { get; init; } = string.Empty;
    public int    Year          { get; init; }
    public float  OptimalToe    { get; init; }
    public float  OptimalCamber { get; init; }
}

public record CreateCarDto
{
    public string Brand         { get; init; } = string.Empty;
    public string Model         { get; init; } = string.Empty;
    public int    Year          { get; init; }
    public float  OptimalToe    { get; init; }
    public float  OptimalCamber { get; init; }
}
