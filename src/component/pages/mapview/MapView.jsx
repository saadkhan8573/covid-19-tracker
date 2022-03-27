import React from 'react'

const MapView = ({ center, zoom }) => {
    return (
        <>
            <div className="shadow-2xl bg-white rounded-lg p-4 my-4 " style={{ height: '550px' }}>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55565170.29301636!2d-132.08532758867793!3d31.786060306224!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54eab584e432360b%3A0x1c3bb99243deb742!2sUnited%20States!5e0!3m2!1sen!2s!4v1630850760707!5m2!1sen!2s" className="w-full" height={515} style={{ border: 0 }} allowFullScreen loading="lazy" />
                {/* <LeafletMap center={center} zoom={zoom}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                </LeafletMap> */}
            </div>
        </>
    )
}

export default MapView
