function SearchHistory({ history, onSearch }) {
  return (
    <div className="history">
      <h3>Lịch sử tìm kiếm</h3>

      {history.length === 0 ? (
        <p>Chưa có lịch sử</p>
      ) : (
        history.map((city, index) => (
          <button
            key={index}
            onClick={() => onSearch(city)}
          >
            {city}
          </button>
        ))
      )}
    </div>
  );
}

export default SearchHistory;