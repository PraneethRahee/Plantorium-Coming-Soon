export function PlantDecorationLeft() {
  return (
    <div className="plant-bg-left">
      <img
        src="/plants-decoration.png"
        alt="Plant decoration left"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          opacity: 0.7
        }}
      />
    </div>
  );
}

export function PlantDecorationLeftForeground() {
  return (
    <div className="plant-fg-left">
      <img
        src="/image-fg-removebg-preview.png"
        alt="Plant decoration foreground left"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          opacity: 1
        }}
      />
    </div>
  );
}
