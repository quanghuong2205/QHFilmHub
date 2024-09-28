function Search({ width, height }: IconProps) {
  return (
    <svg
      width={width || 20}
      height={height || 20}
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M19.361 18.2168L14.601 13.2662C15.8249 11.8113 16.4955 9.98069 16.4955 8.07499C16.4955 3.62251 12.873 0 8.42048 0C3.968 0 0.34549 3.62251 0.34549 8.07499C0.34549 12.5275 3.968 16.15 8.42048 16.15C10.092 16.15 11.6849 15.6458 13.0467 14.6888L17.8429 19.677C18.0434 19.8852 18.313 20 18.602 20C18.8755 20 19.1349 19.8957 19.3319 19.7061C19.7504 19.3034 19.7637 18.6357 19.361 18.2168ZM8.42048 2.10652C11.7116 2.10652 14.389 4.78391 14.389 8.07499C14.389 11.3661 11.7116 14.0435 8.42048 14.0435C5.1294 14.0435 2.45201 11.3661 2.45201 8.07499C2.45201 4.78391 5.1294 2.10652 8.42048 2.10652Z'
        fill='currentColor'
      />
    </svg>
  );
}

export default Search;
