function WeatherCard({ weather }) {
  return (
    <div className="weather-card">
      <h2>{weather.city}</h2>

      <img
        src={weather.icon}
        alt="weather icon"
      />

      <p>
        <strong>Nhiệt độ:</strong> {weather.temp}°C
      </p>

      <p>
        <strong>Độ ẩm:</strong> {weather.humidity}%
      </p>

      <p>
        <strong>Mô tả:</strong> {weather.description}
      </p>
    </div>
  );
}

export default WeatherCard;