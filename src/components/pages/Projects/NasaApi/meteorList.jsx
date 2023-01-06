import { useEffect } from "react";
import { useState } from "react";
import './Nasa.css';
import MeteorCard from "./meteorCard";
import Map from "./map";

export default function MeteorList() {
    const [isLoading, setIsloading] = useState(true);
    const [meteor, setMeteor] = useState([]);

    useEffect(() => {
        setIsloading(true);
        fetch("https://data.nasa.gov/resource/gh4g-9sfh")
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                const filteredMeteors = data.filter((meteor) => {
                    return meteor.hasOwnProperty("geolocation");
                });
                setMeteor(filteredMeteors.slice(0, 50));
                setIsloading(false);
            });
    }, []);

    if (isLoading) return <p>Loading...</p>;
    return (
        <section id="meteor-list">
            <Map data={meteor} />
            <div className="meteor-card-container">
                {meteor.map(
                    ({
                        id,
                        name: meteorName,
                        year,
                        geolocation: { latitude, longitude },
                    }) => {
                        return (
                            <MeteorCard
                                key={id}
                                keys={id}
                                meteorName={meteorName}
                                year={year}
                                latitude={latitude}
                                longitude={longitude}
                            />
                        );
                    }
                )}
            </div>
        </section>
    );
}