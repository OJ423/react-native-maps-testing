export default function(toilet) {
  return <Marker
            draggable
            coordinate={{
              latitude: toilet.latitude,
              longitude: toilet.longitude,
            }}
            onDragEnd={
              (e) => alert(JSON.stringify(e.nativeEvent.coordinate))
            }
            title={toilet.name}
            description={toilet.directions}
          />
}