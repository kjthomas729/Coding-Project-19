import React, { useState, useEffect } from 'react';

const Gallery = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await fetch('https://course-api.com/react-tours-project');
        const tours = await response.json();
        setTours(tours);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  const removeTour = (id) => {
    const newTours = tours.filter((tour) => tour.id !== id);
    setTours(newTours);
  };

  const toggleReadMore = (id) => {
    setTours(tours.map(tour => tour.id === id ? { ...tour, readMore: !tour.readMore } : tour));
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>Error loading tours</h2>;
  }

  return (
    <div className="gallery">
      {tours.map((tour) => (
        <div key={tour.id} className="tour">
          <h2>{tour.name}</h2>
          <p>
            {tour.readMore ? tour.info : `${tour.info.substring(0, 100)}...`}
            <button onClick={() => toggleReadMore(tour.id)}>
              {tour.readMore ? 'Show Less' : 'Read More'}
            </button>
          </p>
          <button onClick={() => removeTour(tour.id)}>Not Interested</button>
        </div>
      ))}
    </div>
  );
};

export default Gallery;