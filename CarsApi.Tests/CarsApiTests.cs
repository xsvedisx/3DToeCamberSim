using System.Net;
using System.Net.Http.Json;
using Microsoft.AspNetCore.Mvc.Testing;
using Xunit;
using System.Collections.Generic;
using CarsApi;

namespace CarsApi.Tests
{
    public class CarsApiTests
    {
        [Fact]
        public async Task GetCars_ReturnsSeededCars()
        {
            using var factory = new WebApplicationFactory<Program>();
            var client = factory.CreateClient();

            var response = await client.GetAsync("/cars");
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);

            var cars = await response.Content.ReadFromJsonAsync<List<Car>>();
            Assert.NotNull(cars);
            Assert.Equal(3, cars.Count);
        }

        [Fact]
        public async Task PostCar_CreatesNewCar()
        {
            using var factory = new WebApplicationFactory<Program>();
            var client = factory.CreateClient();

            var newCar = new CreateCarDto
            {
                Brand = "Nissan",
                Model = "Altima",
                Year = 2023,
                OptimalToe = 0.4f,
                OptimalCamber = -0.2f
            };

            var response = await client.PostAsJsonAsync("/cars", newCar);
            Assert.Equal(HttpStatusCode.Created, response.StatusCode);
            Assert.StartsWith("/cars/", response.Headers.Location?.OriginalString);

            var createdCar = await response.Content.ReadFromJsonAsync<Car>();
            Assert.NotNull(createdCar);
            Assert.Equal("Nissan", createdCar.Brand);
            Assert.Equal("Altima", createdCar.Model);
            Assert.Equal(2023, createdCar.Year);
            Assert.Equal(0.4f, createdCar.OptimalToe);
            Assert.Equal(-0.2f, createdCar.OptimalCamber);
        }

        [Fact]
        public async Task DeleteCar_RemovesCar()
        {
            using var factory = new WebApplicationFactory<Program>();
            var client = factory.CreateClient();

            var dto = new CreateCarDto
            {
                Brand = "Test",
                Model = "X",
                Year = 2001,
                OptimalToe = 0f,
                OptimalCamber = 0f
            };
            var post = await client.PostAsJsonAsync("/cars", dto);
            var added = await post.Content.ReadFromJsonAsync<Car>();

            var delResponse = await client.DeleteAsync($"/cars/{added?.Id}");
            Assert.Equal(HttpStatusCode.NoContent, delResponse.StatusCode);

            var getMeasure = await client.GetAsync($"/cars/{added?.Id}/measurements");
            Assert.Equal(HttpStatusCode.NotFound, getMeasure.StatusCode);
        }

        [Fact]
        public async Task GetMeasurements_ValidId_ReturnsMeasurement()
        {
            using var factory = new WebApplicationFactory<Program>();
            var client = factory.CreateClient();

            var measurement = await client.GetFromJsonAsync<MeasurementDto>($"/cars/1/measurements");
            Assert.NotNull(measurement);
            Assert.Equal(1, measurement.Id);
        }

        [Fact]
        public async Task GetMeasurements_InvalidId_ReturnsNotFound()
        {
            using var factory = new WebApplicationFactory<Program>();
            var client = factory.CreateClient();

            var response = await client.GetAsync($"/cars/999/measurements");
            Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
        }

        public record MeasurementDto(
            int Id,
            string Brand,
            string Model,
            int Year,
            float OptimalToe,
            float OptimalCamber,
            float LeftToe,
            float RightToe,
            float LeftCamber,
            float RightCamber);
    }
}
