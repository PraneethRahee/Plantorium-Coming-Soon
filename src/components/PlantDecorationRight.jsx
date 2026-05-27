export function PlantDecorationRight() {
  return (
    <div className="plant-bg-right">
      <img
        src="/plants-decoration.png"
        alt="Plant decoration background"
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

function PlantDecorationRightForeground() {
  return (
    <div className="plant-fg-right">
      <img
        src="/image-fg-removebg-preview.png"
        alt="Plant decoration foreground"
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

export { PlantDecorationRightForeground }
